import { useSelector } from 'react-redux';

/**
 * Todo...
 * Loading 還沒測試，規劃用 article api state 處理
 */
const BlogPage = () => {
    const { isArticleLoading } = useSelector(state => state.article);

    return (
        <div className="page_bg">
            <div
                className="container mb-5 blog"
                style={
                    isArticleLoading
                        ? {
                              width: '100vw',
                              height: '100vh',
                              overflow: 'hidden',
                          }
                        : {}
                }
            >
                {isArticleLoading && (
                    <div
                        className="d-flex justify-content-center align-items-center"
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100vw',
                            height: '100vh',
                            backgroundColor: 'rgba(255,255,255,0.3)',
                            zIndex: 999,
                        }}
                    >
                        {' '}
                        loading...
                    </div>
                )}
                <div className="page_title">
                    <h3>部落格</h3>
                    <h6>Blog</h6>
                </div>
                <div className="row my-5">
                    <div className="col-md-12 mb-3">
                        <h4 className="session_title">
                            <span>熱門內容 Trending</span>
                        </h4>
                        <div className="row row-cols-1 row-cols-md-3 row-cols-lg-4 g-3">
                            <div className="col mb-3">
                                <a href="#" className="card bg_image">
                                    <img
                                        src="https://images.unsplash.com/photo-1515396950203-9d2889e0015f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTZ8fFByb3Bvc2FsJTIwcGl6emF8ZW58MHwxfDB8fHww"
                                        alt="title"
                                    />
                                    <div className="card-body gradient">
                                        <h5 className="card-title">
                                            披薩求婚傳說(api.title)
                                        </h5>
                                        <p className="card-text">
                                            你知道嗎？吃一片 pizza
                                            就可以獲得愛情...(api.description)
                                        </p>
                                        <button
                                            type="button"
                                            className="btn link_toDetail"
                                        >
                                            Touch Me
                                        </button>
                                    </div>
                                </a>
                            </div>
                            <div className="col mb-3">
                                <a href="#" className="card bg_image">
                                    <img
                                        src="https://images.unsplash.com/photo-1515396950203-9d2889e0015f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTZ8fFByb3Bvc2FsJTIwcGl6emF8ZW58MHwxfDB8fHww"
                                        alt="title"
                                    />
                                    <div className="card-body gradient">
                                        <h5 className="card-title">
                                            披薩求婚傳說(api.title)
                                        </h5>
                                        <p className="card-text">
                                            你知道嗎？吃一片 pizza
                                            就可以獲得愛情...(api.description)
                                        </p>
                                        <button
                                            type="button"
                                            className="btn link_toDetail"
                                        >
                                            Touch Me
                                        </button>
                                    </div>
                                </a>
                            </div>
                            <div className="col mb-3">
                                <a href="#" className="card bg_image">
                                    <img
                                        src="https://images.unsplash.com/photo-1515396950203-9d2889e0015f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTZ8fFByb3Bvc2FsJTIwcGl6emF8ZW58MHwxfDB8fHww"
                                        alt="title"
                                    />
                                    <div className="card-body gradient">
                                        <h5 className="card-title">
                                            披薩求婚傳說(api.title)
                                        </h5>
                                        <p className="card-text">
                                            你知道嗎？吃一片 pizza
                                            就可以獲得愛情...(api.description)
                                        </p>
                                        <button
                                            type="button"
                                            className="btn link_toDetail"
                                        >
                                            Touch Me
                                        </button>
                                    </div>
                                </a>
                            </div>
                            <div className="col mb-3">
                                <a href="#" className="card bg_image">
                                    <img
                                        src="https://images.unsplash.com/photo-1515396950203-9d2889e0015f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTZ8fFByb3Bvc2FsJTIwcGl6emF8ZW58MHwxfDB8fHww"
                                        alt="title"
                                    />
                                    <div className="card-body gradient">
                                        <h5 className="card-title">
                                            披薩求婚傳說(api.title)
                                        </h5>
                                        <p className="card-text">
                                            你知道嗎？吃一片 pizza
                                            就可以獲得愛情...(api.description)
                                        </p>
                                        <button
                                            type="button"
                                            className="btn link_toDetail"
                                        >
                                            Touch Me
                                        </button>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-8 mb-3">
                        <h4 className="session_title latest">
                            <span>最新消息 Latest</span>
                        </h4>
                        <div
                            className="card mb-3"
                            style={{ backgroundColor: 'transparent' }}
                        >
                            <div className="row g-0 align-items-center">
                                <div className="col-md-4">
                                    <img
                                        src="https://images.unsplash.com/photo-1546724867-3b2dabdbc5b0?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fFNwZWNpYWwlMjBPZmZlciUyMHBpenphfGVufDB8MHwwfHx8MA%3D%3D"
                                        className="img-fluid border-0"
                                        alt="..."
                                    />
                                </div>
                                <div className="col-md-8 justify-content-between">
                                    <div className="card-body">
                                        <a href="#">
                                            <h5 className="card-title fw-bold">
                                                限時特價 api.title
                                            </h5>
                                        </a>
                                        <p className="card-text">
                                            限時特價，快來搶購！全場商品折扣高達50%，數量有限，先到先得！
                                            想要低價嗎？快來搶購，這個限時特價錯過就沒有了！
                                            不要問，就是特價！快來，內用外帶享有相同優惠！
                                        </p>
                                    </div>
                                    <div className="card-body">
                                        <small className="text-body-secondary">
                                            2025-02-27 22:16 發佈
                                        </small>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <hr />
                        <div
                            className="card mb-3"
                            style={{ backgroundColor: 'transparent' }}
                        >
                            <div className="row g-0 align-items-center">
                                <div className="col-md-4">
                                    <img
                                        src="https://images.unsplash.com/photo-1546724867-3b2dabdbc5b0?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fFNwZWNpYWwlMjBPZmZlciUyMHBpenphfGVufDB8MHwwfHx8MA%3D%3D"
                                        className="img-fluid border-0"
                                        alt="..."
                                    />
                                </div>
                                <div className="col-md-8 justify-content-between">
                                    <div className="card-body">
                                        <a href="#">
                                            <h5 className="card-title fw-bold">
                                                限時特價 api.title
                                            </h5>
                                        </a>
                                        <p className="card-text">
                                            限時特價，快來搶購！全場商品折扣高達50%，數量有限，先到先得！
                                            想要低價嗎？快來搶購，這個限時特價錯過就沒有了！
                                            不要問，就是特價！快來，內用外帶享有相同優惠！
                                        </p>
                                    </div>
                                    <div className="card-body">
                                        <small className="text-body-secondary">
                                            2025-02-27 22:16 發佈
                                        </small>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <hr />
                        <div
                            className="card mb-3"
                            style={{ backgroundColor: 'transparent' }}
                        >
                            <div className="row g-0 align-items-center">
                                <div className="col-md-4">
                                    <img
                                        src="https://images.unsplash.com/photo-1546724867-3b2dabdbc5b0?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fFNwZWNpYWwlMjBPZmZlciUyMHBpenphfGVufDB8MHwwfHx8MA%3D%3D"
                                        className="img-fluid border-0"
                                        alt="..."
                                    />
                                </div>
                                <div className="col-md-8 justify-content-between">
                                    <div className="card-body">
                                        <a href="#">
                                            <h5 className="card-title fw-bold">
                                                限時特價 api.title
                                            </h5>
                                        </a>
                                        <p className="card-text">
                                            限時特價，快來搶購！全場商品折扣高達50%，數量有限，先到先得！
                                            想要低價嗎？快來搶購，這個限時特價錯過就沒有了！
                                            不要問，就是特價！快來，內用外帶享有相同優惠！
                                        </p>
                                    </div>
                                    <div className="card-body">
                                        <small className="text-body-secondary">
                                            2025-02-27 22:16 發佈
                                        </small>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <hr />
                    </div>
                    <div className="col-md-4 mb-3">
                        <h4 className="session_title featured">
                            <span>專屬特色 Featured</span>
                        </h4>
                        <div
                            className="card mb-3"
                            style={{ backgroundColor: 'transparent' }}
                        >
                            <img
                                src="https://img.freepik.com/premium-photo/pizza-dartboard-with-3d-character-aiming-bullseye_1282444-74168.jpg?w=1060"
                                className=""
                                alt="..."
                            />
                            <div className="card-body">
                                <a href="#">
                                    <h5 className="card-title">
                                        每一口披薩都充滿挑戰
                                    </h5>
                                </a>
                                <p className="card-text">
                                    吃披薩不再是單純的享受！
                                    來我們的店，邊吃披薩邊玩飛鏢，和朋友一起競爭，享受樂趣與美食的雙重誘惑！
                                    獨特的吃喝玩樂體驗，等你來挑戰！
                                </p>
                                <p className="card-text">
                                    <small className="text-body-secondary">
                                        2025-02-27 22:16 發佈
                                    </small>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BlogPage;
