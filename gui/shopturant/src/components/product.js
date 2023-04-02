function Product(props) {
    console.log(props);
    return (
        <div className="product">
            <div className="content">
                <div className="" >
                    <h3 className="p-2">{props.data.title}</h3>
                </div>
                <div className="productImageDiv">
                    <div className="first-line" >
                        <div className="productImage">
                            <img src='/productDemo.jpg' className="productSingleImage" alt="image"/>
                        </div>
                        <div className="productImage">
                            <img src='/productDemo.jpg' className="productSingleImage" alt="image"/>
                        </div>
                    </div>
                    <div className="second-line" >
                        <div className="productImage">
                            <img src='/productDemo.jpg' className="productSingleImage" alt="image"/>
                        </div>
                        <div className="productImage">
                            <img src='/productDemo.jpg' className="productSingleImage" alt="image"/>
                        </div>
                    </div>
                </div>
                <div className="" >
                    <h5 className="p-2"><a href="#">See more</a></h5>
                </div>
            </div>
        </div>
    );
}

export default Product;