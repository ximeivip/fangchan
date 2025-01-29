import React, { useState } from 'react';
import { Table, Card, Button, Space, Modal, Form, Input, InputNumber, DatePicker, message, Upload } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons';
import { getAllProjects, addProject, updateProject, deleteProject } from '../../data/projectData';

const AdminProjects = () => {
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [projectList, setProjectList] = useState(getAllProjects());
  const [fileList, setFileList] = useState([]);

  const handleAdd = () => {
    form.resetFields();
    setEditingProject(null);
    setFileList([]);
    setVisible(true);
  };

  const handleEdit = (record) => {
    form.setFieldsValue({
      ...record,
      startDate: record.startDate && dayjs(record.startDate),
      endDate: record.endDate && dayjs(record.endDate)
    });
    setEditingProject(record);
    setFileList(record.images.map((url, index) => ({
      uid: `-${index}`,
      name: `项目图片${index + 1}`,
      status: 'done',
      url
    })));
    setVisible(true);
  };

  const handleDelete = (record) => {
    Modal.confirm({
      title: '确认删除',
      content: `确定要删除项目「${record.title}」吗？`,
      onOk: () => {
        deleteProject(record.id);
        setProjectList(getAllProjects());
        message.success('删除成功');
      }
    });
  };

  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      const images = fileList.map(file => file.url || file.response?.url || '');
      const projectData = {
        ...values,
        images
      };
      
      if (editingProject) {
        await updateProject(editingProject.id, projectData);
      } else {
        await addProject(projectData);
      }
      
      setProjectList(getAllProjects());

      message.success(editingProject ? '更新成功' : '添加成功');
      setVisible(false);
    } catch (error) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const uploadProps = {
    onRemove: (file) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
    beforeUpload: (file) => {
      // 在实际应用中，这里应该上传到服务器
      // 这里模拟上传成功，直接生成一个本地URL
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const newFile = {
          uid: file.uid,
          name: file.name,
          status: 'done',
          url: reader.result
        };
        setFileList(prev => [...prev, newFile]);
      };
      return false;
    },
    fileList
  };

  const columns = [
    {
      title: '项目名称',
      dataIndex: 'title',
      key: 'title'
    },
    {
      title: '地址',
      dataIndex: 'location',
      key: 'location'
    },
    {
      title: '目标金额（万元）',
      dataIndex: 'totalAmount',
      key: 'totalAmount'
    },
    {
      title: '已募集（万元）',
      dataIndex: 'currentAmount',
      key: 'currentAmount'
    },
    {
      title: '预期收益率',
      dataIndex: 'expectedReturn',
      key: 'expectedReturn',
      render: (text) => `${text}%`
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status'
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Space>
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          >
            编辑
          </Button>
          <Button
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record)}
          >
            删除
          </Button>
        </Space>
      )
    }
  ];

  return (
    <div>
      <Card
        title="项目管理"
        extra={
          <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
            添加项目
          </Button>
        }
      >
        <Table
          dataSource={projectList}
          columns={columns}
          rowKey="id"
          pagination={{
            pageSize: 10,
            showTotal: (total) => `共 ${total} 条数据`
          }}
        />
      </Card>

      <Modal
        title={editingProject ? '编辑项目' : '添加项目'}
        open={visible}
        onCancel={() => setVisible(false)}
        onOk={() => form.submit()}
        confirmLoading={loading}
        width={800}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
        >
          <Form.Item
            name="images"
            label="项目图片"
            rules={[{ required: true, message: '请上传至少一张项目图片' }]}
          >
            <Upload
              listType="picture-card"
              multiple
              maxCount={5}
              {...uploadProps}
            >
              <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>上传图片</div>
              </div>
            </Upload>
          </Form.Item>
          <Form.Item
            name="title"
            label="项目名称"
            rules={[{ required: true, message: '请输入项目名称' }]}
          >
            <Input placeholder="请输入项目名称" />
          </Form.Item>
          <Form.Item
            name="location"
            label="项目地址"
            rules={[{ required: true, message: '请输入项目地址' }]}
          >
            <Input placeholder="请输入项目地址" />
          </Form.Item>
          <Form.Item
            name="totalAmount"
            label="目标金额（万元）"
            rules={[{ required: true, message: '请输入目标金额' }]}
          >
            <InputNumber
              min={1}
              style={{ width: '100%' }}
              placeholder="请输入目标金额"
            />
          </Form.Item>
          <Form.Item
            name="expectedReturn"
            label="预期收益率（%）"
            rules={[{ required: true, message: '请输入预期收益率' }]}
          >
            <InputNumber
              min={0}
              max={100}
              style={{ width: '100%' }}
              placeholder="请输入预期收益率"
            />
          </Form.Item>
          <Form.Item
            name="currentAmount"
            label="已募集资金（万元）"
            rules={[{ required: true, message: '请输入已募集资金' }]}
          >
            <InputNumber
              min={0}
              style={{ width: '100%' }}
              placeholder="请输入已募集资金"
            />
          </Form.Item>
          <Form.Item
            name="minInvestment"
            label="最低投资额（万元）"
            rules={[{ required: true, message: '请输入最低投资额' }]}
          >
            <InputNumber
              min={1}
              style={{ width: '100%' }}
              placeholder="请输入最低投资额"
            />
          </Form.Item>
          <Form.Item
            name="duration"
            label="投资期限（月）"
            rules={[{ required: true, message: '请输入投资期限' }]}
          >
            <InputNumber
              min={1}
              style={{ width: '100%' }}
              placeholder="请输入投资期限"
            />
          </Form.Item>
          <Form.Item
            name="endDate"
            label="截止日期"
            rules={[{ required: true, message: '请选择截止日期' }]}
          >
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item
            name="description"
            label="项目描述"
            rules={[{ required: true, message: '请输入项目描述' }]}
          >
            <Input.TextArea rows={4} placeholder="请输入项目描述" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AdminProjects;