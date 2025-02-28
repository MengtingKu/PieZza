const ChefDelicious = () => {
    return (
        <div className="container">
            <div className="row g-3 mb-3 justify-content-between align-items-center">
                <div className="col-md-5 img_group">
                    <div className="layer"></div>
                    <img
                        src="https://plus.unsplash.com/premium_photo-1661288474987-1e90159ff2ca?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTN8fGNoZWZ8ZW58MHx8MHx8fDA%3D"
                        alt="chef avatar"
                        className="img-fluid animate__fadeInLeft avatar_chef"
                    />
                    <img
                        src="./hansom-chef.webp"
                        alt="chef avatar"
                        className="img-fluid animate__fadeInLeft hansom_chef "
                    />
                </div>
                <div className="col-md-6">
                    <div className="title_group">
                        <h6 className="subtitle">Chef&apos;s Delicious</h6>
                        <h3 className="title">廚師堅持的美味秘密</h3>
                    </div>
                    <blockquote>
                        <p>每一份 PieZza，都是無數次實驗與匠心的結晶。</p>
                        <p>
                            簡單的空間裡，承載著不簡單的料理，我們的每道披薩，都經過精心挑選的食材、獨特的烘焙技巧與對完美味道的不斷追求。
                        </p>
                        <p>
                            我們相信，真正的美味來自於對細節的執著，來自於不斷專研與創新。每一次的手工揉麵，每一刻窯火的跳動，都是對食客的真心承諾。
                        </p>
                        <p>
                            每一個滋味，都有故事；每一個口感，都是時間與心血的凝聚。
                        </p>
                        <p>
                            PieZza，不只是一塊披薩，更是一份用心、用愛，讓你品味到的快樂與溫暖。
                        </p>
                        <p>
                            就是要
                            PieZza，因為這裡的每一口，都是為了讓你微笑的滋味。
                        </p>
                        <footer className="text-end">
                            — <cite>Chef Tyson</cite>
                        </footer>
                    </blockquote>
                </div>
            </div>
        </div>
    );
};

export default ChefDelicious;
