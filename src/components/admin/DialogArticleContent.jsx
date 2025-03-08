import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { formatTimestamp } from '@helper/stringAndDataHelpers';

const DialogArticleContent = ({
    modalType,
    templateData,
    handleModalInputChange,
}) => {
    const { article } = useSelector(state => state.adminArticle);

    if (modalType === 'delete') {
        return (
            <>
                你是否要刪除
                <span className="text-danger fw-bold ms-3">
                    {templateData.title}
                </span>
            </>
        );
    }

    if (modalType === 'read') {
        return (
            <>
                <div className="card mb-3 border-0">
                    <div className="row g-0 justify-content-between">
                        <div className="col-md-4 h-100">
                            <img
                                src={article.image}
                                className="img-fluid rounded-0"
                                alt={article.title}
                            />
                        </div>
                        <div className="col-md-8 d-flex justify-content-between">
                            <div className="card-body">
                                <div className="title_group">
                                    <h6 className="card-title">
                                        {article.title}
                                        <span className="badge rounded-pill text-bg-success ms-3 px-2">
                                            {article.category}
                                        </span>
                                    </h6>
                                </div>

                                <p className="card-text">
                                    <small className="text-body-secondary">
                                        {formatTimestamp(
                                            article.create_at / 1000
                                        )}{' '}
                                        {article.author}發布
                                    </small>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>{' '}
                <small className="card-text d-block mb-3">
                    {article.description}
                </small>
                <p className="card-text">{article.content}</p>
            </>
        );
    }

    return (
        <div className="row g-4">
            <div className="col-md-4">
                <div className="mb-4">
                    <label htmlFor="imageUrl" className="form-label">
                        主圖
                    </label>
                    <div className="input-group">
                        <input
                            name="image"
                            type="text"
                            id="image"
                            className="form-control"
                            placeholder="請輸入圖片連結"
                            defaultValue={article.image}
                            onChange={handleModalInputChange}
                        />
                    </div>
                    <img
                        src={article.image}
                        alt={article.title}
                        className="img-fluid"
                    />
                </div>
            </div>

            <div className="col-md-8">
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">
                        標題
                    </label>
                    <input
                        name="title"
                        id="title"
                        type="text"
                        className="form-control"
                        placeholder="請輸入標題"
                        defaultValue={article.title}
                        onChange={handleModalInputChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="author" className="form-label">
                        作者
                    </label>
                    <input
                        name="author"
                        id="author"
                        type="text"
                        className="form-control"
                        placeholder="請輸入作者"
                        defaultValue={article.author}
                        onChange={handleModalInputChange}
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="category" className="form-label">
                        分類
                    </label>
                    <input
                        name="category"
                        id="category"
                        type="text"
                        className="form-control"
                        placeholder="請輸入分類"
                        defaultValue={article.category}
                        onChange={handleModalInputChange}
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="create_at" className="form-label">
                        時間戳
                    </label>
                    <input
                        name="create_at"
                        id="create_at"
                        type="text"
                        className="form-control"
                        placeholder="請輸入13位時間戳"
                        defaultValue={article.create_at}
                        onChange={handleModalInputChange}
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="description" className="form-label">
                        描述
                    </label>
                    <textarea
                        name="description"
                        id="description"
                        className="form-control"
                        rows={4}
                        defaultValue={article.description}
                        onChange={handleModalInputChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="content" className="form-label">
                        內容
                    </label>
                    <textarea
                        name="content"
                        id="content"
                        className="form-control"
                        rows={4}
                        placeholder="請輸入說明內容"
                        defaultValue={article.content}
                        onChange={handleModalInputChange}
                    />
                </div>

                <div className="form-check mb-3">
                    <input
                        name="isPublic"
                        type="checkbox"
                        className="form-check-input"
                        id="isPublic"
                        defaultChecked={article.isPublic}
                        onChange={handleModalInputChange}
                    />
                    <label className="form-check-label" htmlFor="isPublic">
                        是否發布
                    </label>
                </div>
            </div>
        </div>
    );
};

DialogArticleContent.propTypes = {
    modalType: PropTypes.string.isRequired,
    templateData: PropTypes.object.isRequired,
    handleModalInputChange: PropTypes.func.isRequired,
};

export default DialogArticleContent;
