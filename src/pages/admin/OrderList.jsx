import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    getOrders,
    putOrderById,
    deleteOrderById,
    deleteOrders,
} from '@slices/adminOrderSlice';
import {
    splitText,
    formatTimestamp,
    transformTableData,
} from '@helper/stringAndDataHelpers';
import DynamicTable from '@components/common/DynamicTable';
import Pagination from '@components/common/Pagination';
import DialogDelete from '@components/common/DialogDelete';
import DialogBasic from '@components/common/DialogBasic';
import DialogOrderContent from '@components/admin/DialogOrderContent';
import Loading from '@components/common/Loading';

const defaultTemplateData = {
    create_at: null,
    id: '',
    is_paid: true,
    num: 1,
    paid_date: null,
    products: {},
    total: 0,
    user: null,
};

const OrderList = () => {
    const dispatch = useDispatch();
    const { orders, pagination, isOrderLoading } = useSelector(
        state => state.adminOrder
    );
    const [currentPage, setCurrentPage] = useState(0);
    const [modalType, setModalType] = useState('');
    const [templateData, setTemplateData] = useState(defaultTemplateData);
    const [showModal, setShowModal] = useState(false);

    const ordersFields = [
        {
            key: 'no',
            name: '#',
            class: 'text-center align-middle',
            type: 'dataNo',
            width: '5%',
            render: index => {
                const perPage = 10;
                const pageOffset =
                    currentPage > 0 ? (currentPage - 1) * perPage : currentPage;
                const displayNo = pageOffset + index + 1;

                return <span>{displayNo}</span>;
            },
        },
        {
            key: 'name',
            name: '姓名',
            class: 'text-start align-middle',
            type: 'custom',
            render: order => {
                return <small>{order.user.name}</small>;
            },
        },
        {
            key: 'product_id',
            name: '訂單品項',
            class: 'text-start align-middle',
            type: 'custom',
            render: order => {
                return (
                    <small>
                        {transformTableData(Object.values(order.products)).map(
                            pro => {
                                return (
                                    <small
                                        className="d-block ms-1"
                                        key={pro.product_id}
                                    >
                                        {
                                            splitText(pro.product_title)
                                                .chineseText
                                        }{' '}
                                        x {pro.qty}
                                    </small>
                                );
                            }
                        )}
                    </small>
                );
            },
        },
        {
            key: 'total',
            name: '訂單狀態',
            class: 'align-middle',
            type: 'number',
        },
        {
            key: 'is_paid',
            name: '訂單狀態',
            class: 'text-center align-middle',
            type: 'custom',
            render: order => {
                return (
                    <>
                        {order.is_paid ? (
                            <small className="text-success">
                                {order.paid_date
                                    ? formatTimestamp(
                                          order.paid_date,
                                          'YYYY-MM-DD'
                                      )
                                    : '手動修改'}
                                <br />
                                已付款
                            </small>
                        ) : (
                            <small className="text-danger">未付款</small>
                        )}
                    </>
                );
            },
        },
    ];
    const orderActions = [
        {
            label: '編輯',
            class: 'btn btn-outline-primary',
            handler: product => {
                setTemplateData({ ...defaultTemplateData, ...product });
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
            handler: product => {
                setTemplateData({ ...defaultTemplateData, ...product });
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
            handler: product => {
                setTemplateData({ ...defaultTemplateData, ...product });
                setModalType('delete');
                setShowModal(true);
            },
            render: () => {
                return <span>刪除</span>;
            },
        },
    ];

    const fetchDeleteOrders = () => {
        return async dispatch => {
            const response = await dispatch(deleteOrders());

            return response.payload;
        };
    };

    const fetchGetOrders = page => {
        setCurrentPage(page);

        return async dispatch => {
            const response = await dispatch(getOrders(page));

            return response.payload;
        };
    };

    const closeModal = () => {
        setShowModal(false);
        setTemplateData(defaultTemplateData);
    };

    const handleTarget = () => {
        switch (modalType) {
            case 'edit':
                dispatch(
                    putOrderById({
                        id: templateData.id,
                        params: templateData,
                        currentPage,
                    })
                );
                break;
            case 'delete':
                dispatch(deleteOrderById({ id: templateData.id }));
                break;
            case 'read':
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
        }));
    };

    const renderContent = () => {
        return (
            <DialogOrderContent
                modalType={modalType}
                templateData={templateData}
                handleModalInputChange={handleModalInputChange}
            />
        );
    };

    useEffect(() => {
        dispatch(getOrders());
    }, [dispatch]);

    return (
        <>
            <div
                className="container cart_list"
                style={
                    isOrderLoading
                        ? {
                              width: '100vw',
                              height: '100vh',
                              overflow: 'hidden',
                          }
                        : {}
                }
            >
                {isOrderLoading && <Loading />}
                <div className="header_group d-flex justify-content-between align-items-end">
                    <div className="page_title">
                        <h3>訂單管理列表</h3>
                        <h6>Order Management List</h6>
                    </div>
                    <div>
                        <DialogDelete
                            fetchDeleteData={fetchDeleteOrders}
                            className="btn btn-outline-danger rounded-0"
                        >
                            刪除全部訂單
                        </DialogDelete>
                    </div>
                </div>
                <div className="my-5">
                    <DynamicTable
                        data={orders || []}
                        fields={ordersFields}
                        endActions={orderActions}
                    />
                    <Pagination
                        pagination={pagination}
                        fetchData={fetchGetOrders}
                    />
                </div>
            </div>

            {showModal && (
                <DialogBasic
                    modalType={modalType}
                    closeModal={closeModal}
                    topic="訂單"
                    handleTarget={handleTarget}
                    setTemplateData={setTemplateData}
                    showModal={showModal}
                >
                    {renderContent()}
                </DialogBasic>
            )}
        </>
    );
};

export default OrderList;
