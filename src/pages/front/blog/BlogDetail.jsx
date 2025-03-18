import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getArticleById } from '@slices/articleSlice';
import { formatTimestamp } from '@helper/stringAndDataHelpers';
import Loading from '@components/common/Loading';

const BlogDetail = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { isArticleLoading, article } = useSelector(state => state.article);

    useEffect(() => {
        dispatch(getArticleById(id));
    }, [dispatch, id]);

    return (
        <div className="page_bg">
            <div
                className="container-fluid d-flex justify-content-center p-5"
                style={
                    isArticleLoading
                        ? {
                              width: '100%',
                              height: '100vh',
                              overflow: 'hidden',
                          }
                        : {
                              backgroundImage: 'url(./banner/banner-bg.png)',
                          }
                }
            >
                {isArticleLoading && <Loading />}
                {article && (
                    <div
                        className="card mb-3 rounded-0"
                        style={{ maxWidth: '600px' }}
                    >
                        <div
                            className="card-header rounded-0"
                            style={{
                                backgroundImage: `url(${article.image})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center center',
                                height: '300px',
                            }}
                        ></div>
                        <div className="card-body">
                            <h5 className="card-title fw-bold">
                                {article.title}
                            </h5>
                            <small className="card-title">
                                {article.description}
                            </small>
                            <hr />
                            <p
                                className="card-text lh-lg"
                                style={{ letterSpacing: '1px' }}
                            >
                                {article.content}
                            </p>
                            <p className="card-text text-end">
                                <small className="text-body-secondary">
                                    {formatTimestamp(article.create_at)} <br />
                                    {article.author}
                                    發佈
                                </small>
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BlogDetail;
