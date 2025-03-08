import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    getArticles,
    getArticleById,
    postArticle,
    putArticleById,
    deleteArticle,
} from '@slices/adminArticleSlice';
import { formatTimestamp } from '@helper/stringAndDataHelpers';
import DynamicTable from '@components/common/DynamicTable';
import Pagination from '@components/common/Pagination';
import DialogBasic from '@components/common/DialogBasic';
import ArticleModalContent from '@components/admin/ArticleModalContent';

const defaultTemplateData = {
    id: '',
    title: '',
    description: '',
    image: null,
    tag: [],
    create_at: null,
    author: '',
    isPublic: false,
    content: '',
    category: '',
};

const ArticleList = () => {
    const dispatch = useDispatch();
    const { articles, pagination } = useSelector(state => state.adminArticle);
    const [modalType, setModalType] = useState('');
    const [templateData, setTemplateData] = useState(defaultTemplateData);
    const [showModal, setShowModal] = useState(false);

    const articlesFields = [
        {
            key: 'create_at',
            name: '發布日期',
            class: 'text-start align-middle',
            type: 'custom',
            render: pen => {
                return <span>{formatTimestamp(pen.create_at)}</span>;
            },
        },
        {
            key: 'title',
            name: '文章名稱',
            class: 'text-start align-middle',
        },
        {
            key: 'author',
            name: '作者',
            class: 'text-start align-middle',
        },
        {
            key: 'category',
            name: '分類',
            class: 'text-start align-middle',
        },
    ];
    const articleActions = [
        {
            label: '編輯',
            class: 'btn btn-outline-primary',
            handler: pen => {
                dispatch(getArticleById(pen.id));
                setTemplateData({ ...defaultTemplateData, ...pen });
                setModalType('edit');
                setShowModal(true);
            },
            render: () => {
                return <span>編輯</span>;
            },
        },
        {
            label: '查看',
            class: 'btn btn-outline-secondary',
            handler: pen => {
                dispatch(getArticleById(pen.id));
                setModalType('read');
                setShowModal(true);
            },
            render: () => {
                return <span>查看</span>;
            },
        },
        {
            label: '刪除',
            class: 'btn btn-outline-danger',
            handler: pen => {
                setTemplateData({ ...defaultTemplateData, ...pen });
                setModalType('delete');
                setShowModal(true);
            },
            render: () => {
                return <span>刪除</span>;
            },
        },
    ];

    const fetchGetArticles = page => {
        return async dispatch => {
            const response = await dispatch(getArticles(page));

            return response.payload;
        };
    };

    const closeModal = () => setShowModal(false);

    const handleTarget = () => {
        switch (modalType) {
            case 'create':
                dispatch(postArticle({ params: templateData }));
                setTemplateData(defaultTemplateData);
                break;
            case 'read':
                break;
            case 'edit':
                dispatch(
                    putArticleById({
                        id: templateData.id,
                        params: templateData,
                    })
                );
                setTemplateData(defaultTemplateData);
                break;
            case 'delete':
                dispatch(deleteArticle({ id: templateData.id }));
                break;
            default:
                alert('操作失敗');
        }
        setModalType('');
        closeModal();
    };

    const handleModalInputChange = e => {
        const { id, value, type, checked } = e.target;
        setTemplateData(prevData => ({
            ...prevData,
            [id]: type === 'checkbox' ? checked : value,
            create_at: new Date().getTime() / 1000,
        }));
    };

    const renderContent = () => {
        return (
            <ArticleModalContent
                modalType={modalType}
                templateData={templateData}
                handleModalInputChange={handleModalInputChange}
            />
        );
    };

    useEffect(() => {
        dispatch(getArticles());
    }, [dispatch]);

    return (
        <>
            <div className="container cart_list">
                <div className="header_group d-flex justify-content-between align-items-end">
                    <div className="page_title">
                        <h3>文章管理列表</h3>
                        <h6>Order Management List</h6>
                    </div>
                    <div>
                        <button
                            type="button"
                            className="btn btn-primary rounded-0"
                            onClick={() => {
                                setModalType('create');
                                setShowModal(true);
                            }}
                        >
                            新增文章
                        </button>
                    </div>
                </div>
                <div className="my-5">
                    <DynamicTable
                        data={articles || []}
                        fields={articlesFields}
                        endActions={articleActions}
                    />
                    <Pagination
                        pagination={pagination}
                        fetchData={fetchGetArticles}
                    />
                </div>
            </div>

            {showModal && (
                <DialogBasic
                    modalType={modalType}
                    closeModal={closeModal}
                    topic="文章"
                    handleTarget={handleTarget}
                    setTemplateData={setTemplateData}
                >
                    {renderContent()}
                </DialogBasic>
            )}
        </>
    );
};

export default ArticleList;
