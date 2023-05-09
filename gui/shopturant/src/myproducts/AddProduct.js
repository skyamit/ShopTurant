import { useContext, useEffect, useState } from "react";
import "./AddProduct.css";
import Config from "../config/Config";
import Toast from "../components/toast/Toast";
import { IdContext } from "../App";

function AddProduct() {
  const [imageLink, setImageLink] = useState();
  const [title, setTitle] = useState();
  const [type, setType] = useState();
  const [categoryy, setCategoryy] = useState("Grocery");
  const [description, setDescription] = useState();
  const [price, setPrice] = useState();
  const [discount, setDiscount] = useState();
  const [category, setCategory] = useState([]);
  const [productAdded, setProductAdded] = useState(false);
  const url = Config.url;
  const idContext = useContext(IdContext);
  const [message, setMessage] = useState("Unable to add product");
  const [statusCode, setStatusCode] = useState(500);


  const categoryLoad = async () => {
    await fetch(url + "/category", {
      method: "POST",
    })
      .then((res) => res.json())
      .then((res) => setCategory(res.data));
    console.log("category|", category);
  };

  const submitProduct = async (e) => {
    e.preventDefault();
        const singleProduct = {
            "userId": idContext.id,
            "title": title,
            "summary": description,
            "price": price,
            "discount": discount,
            "imageId": imageLink,
            "type": type,
            "category":new Array(categoryy),
        }
        await fetch(url + "/product/add", {
            method: "POST",
            headers:{'Content-Type': 'application/json'},
            body : JSON.stringify(singleProduct)
        })
        .then(res => res.json())
        .then((res) => {
          setMessage(res.data);
          setStatusCode(res.statusCode);
          setProductAdded(true);
        });
    };

  useEffect(() => {
    categoryLoad();
    unsetProductAdded();
  }, [imageLink, productAdded]);

  const unsetProductAdded = () => {
    setTimeout(function() {
        setProductAdded(false);
    }, 2000)
};

  return (
    <div className="addproductOuter">
    {productAdded && (<Toast type={statusCode===200?'success':'error'} message={message} /> )}
      <h3 className="addProductHeading">
        Add products which you want to sell{" "}
      </h3>
      <div className="addProductDiv">
        {imageLink && (
          <>
            <img src={imageLink} alt="productImage" className="imagePreview" />
          </>
        )}
        <div className="addForm">
          <form method="post" onSubmit={submitProduct}>
            <div>
                <input className="inputs" placeholder="Tittle" name="tittle" 
                onChange={(e) => {
                    setTitle(e.target.value);
                }}
                />
            </div>
            <div>
                <input className="inputs" placeholder="type" name="type"
                onChange={(e) => {
                    setType(e.target.value);
                }}
               />
            </div>
            <div>
              <span className="spanCategory">Category :</span> <select name="category" className="select"
              onChange={(e) => {
                setCategoryy(e.target.value);
              }}
              >
                {category.map((cat) => {
                  return (
                    <option key={cat.id} value={cat.title}>
                      {cat.title}
                    </option>
                  );
                })}
              </select>
            </div>
            <div>
              <textarea
                className="inputs"
                placeholder="Enter details about products"
                name="summary"
                onChange={(e) => {
                    setDescription(e.target.value);
                }}
                ></textarea>
            </div>
            <div>
                <input className="inputs" placeholder="price" name="price" 
                onChange={(e) => {
                  setPrice(e.target.value);
                }}
                />
            </div>
            <div>
              <input
                className="inputs"
                placeholder="discount"
                name="discount"
                onChange={(e) => {
                    setDiscount(e.target.value);
                  }}
              />
            </div>
            <div>
              <input
                className="inputs"
                onChange={(e) => {
                  setImageLink(e.target.value);
                }}
                placeholder="Image Link"
                name="Image Link"
              />
            </div>
            <div>
              <button type="submit" className="inputs btn btn-outline-primary fw-bold pointer">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
export default AddProduct;
