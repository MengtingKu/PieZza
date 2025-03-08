import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    getProducts,
    postProduct,
    putProductById,
    deleteProduct,
} from '@slices/adminProductSlice';
import { splitText } from '@helper/stringAndDataHelpers';
import DynamicTable from '@components/common/DynamicTable';
import Pagination from '@components/common/Pagination';
import DialogBasic from '@components/common/DialogBasic';
import DialogProductContent from '@components/admin/DialogProductContent';

const defaultTemplateData = {
    id: '',
    imageUrl: null,
    title: '',
    category: '',
    unit: '',
    origin_price: '',
    price: '',
    description: '',
    content: '',
    is_enabled: false,
    imagesUrl: [],
};

const ProductList = () => {
    const dispatch = useDispatch();
    const { products, pagination } = useSelector(state => state.adminProduct);
    const [modalType, setModalType] = useState('');
    const [templateData, setTemplateData] = useState(defaultTemplateData);
    const [showModal, setShowModal] = useState(false);

    const productsFields = [
        {
            key: 'title',
            name: '產品名稱',
            class: 'text-start',
            type: 'custom',
            render: product => {
                const { chineseText, engText } = splitText(product.title);
                return (
                    <>
                        <div className="row justify-content-around align-items-center gx-3">
                            <h6>{chineseText}</h6>
                            <small>{engText}</small>
                        </div>
                    </>
                );
            },
        },
        {
            key: 'origin_price',
            name: '原價',
            class: 'text-end align-middle',
            type: 'number',
        },
        {
            key: 'price',
            name: '售價',
            class: 'text-end align-middle',
            type: 'number',
        },
        {
            key: 'is_enabled',
            name: '狀態',
            class: 'text-center align-middle',
            type: 'custom',
            render: product => {
                return (
                    <span
                        className={`text-${
                            product.is_enabled === 0 ? 'danger' : 'success'
                        }`}
                    >
                        {product.is_enabled === 0 && '未'}
                        啟用
                    </span>
                );
            },
        },
    ];
    const productActions = [
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

    const fetchGetProducts = page => {
        return async dispatch => {
            const response = await dispatch(getProducts(page));

            return response.payload;
        };
    };

    const closeModal = () => {
        setShowModal(false);
        setTemplateData(defaultTemplateData);
    };

    const handleTarget = () => {
        switch (modalType) {
            case 'create':
                dispatch(postProduct({ params: templateData }));
                break;
            case 'edit':
                dispatch(
                    putProductById({
                        id: templateData.id,
                        params: templateData,
                    })
                );
                break;
            case 'delete':
                dispatch(deleteProduct({ id: templateData.id }));
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

    const handleFileInput = async e => {
        const [file] = e.target.files;
        const formData = new FormData();
        formData.append('file-to-upload', file);

        const { VITE_BASE_URL: baseUrl, VITE_APP_PATH: apiPath } = import.meta
            .env;
        const url = `${baseUrl}/api/${apiPath}/admin/upload`;

        try {
            const res = await axios.post(url, formData);
            const { imageUrl } = res.data;

            setTemplateData({ ...templateData, imageUrl });
        } catch (error) {
            console.log('error=>', error);
            alert(error.response.data.message || '檔案格式錯誤');
        } finally {
            e.target.value = '';
        }
    };

    const handleImagesInput = (e, index) => {
        const { value } = e.target;
        const newImagesList = [...templateData.imagesUrl];
        newImagesList[index] = value;

        setTemplateData({ ...templateData, imagesUrl: newImagesList });
    };

    const handleAddImages = () => {
        const newImagesList = [...templateData.imagesUrl, ''];

        setTemplateData({ ...templateData, imagesUrl: newImagesList });
    };

    const handleRemoveImages = () => {
        const newImagesList = [...templateData.imagesUrl];
        newImagesList.pop();

        setTemplateData({ ...templateData, imagesUrl: newImagesList });
    };

    const renderContent = () => {
        return (
            <DialogProductContent
                modalType={modalType}
                templateData={templateData}
                handleModalInputChange={handleModalInputChange}
                handleFileInput={handleFileInput}
                handleImagesInput={handleImagesInput}
                handleAddImages={handleAddImages}
                handleRemoveImages={handleRemoveImages}
            />
        );
    };

    useEffect(() => {
        if (products.length === 0) {
            dispatch(getProducts());
        }
    }, [products.length, dispatch]);

    return (
        <>
            <div className="container cart_list">
                <div className="header_group d-flex justify-content-between align-items-end">
                    <div className="page_title">
                        <h3>產品管理列表</h3>
                        <h6>Product Management List</h6>
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
                            新增產品
                        </button>
                    </div>
                </div>
                <div className="my-5">
                    <DynamicTable
                        data={products || []}
                        fields={productsFields}
                        endActions={productActions}
                    />
                    <Pagination
                        pagination={pagination}
                        fetchData={fetchGetProducts}
                    />
                </div>
            </div>

            {showModal && (
                <DialogBasic
                    modalType={modalType}
                    closeModal={closeModal}
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

export default ProductList;
