import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Card, Form } from "react-bootstrap";
import Message from "../components/Message";
import Loader from "../components/Loader";
import ProductCarousel from "../components/ProductCarousel";
import { listProducts } from "../actions/productActions";
import Paginate from "../components/Paginate";
import Meta from "../components/Meta";
import Rating from "../components/Rating";

const HomeScreen = ({ match }) => {
  const [priceRange, setPriceRange] = useState("");
  const [minRating, setMinRating] = useState(0);
  const [category, setCategory] = useState("");

  const keyword = match.params.keyword;
  const pageNumber = match.params.pageNumber || 1;
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products, page, pages } = productList;

  useEffect(() => {
    dispatch(
      listProducts(keyword, pageNumber, priceRange, minRating, category)
    );
  }, [dispatch, keyword, pageNumber, priceRange, minRating, category]);

  const handlePriceRangeChange = (e) => {
    setPriceRange(e.target.value);
  };

  const handleMinRatingChange = (e) => {
    setMinRating(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  return (
    <>
      <Meta />
      {!keyword ? (
        <ProductCarousel />
      ) : (
        <Link to="/" className="btn btn-light">
          Go Back
        </Link>
      )}
      <h1>Latest Products</h1>
      <Row>
        <Col md={2}>
          <Form.Group controlId="priceRange">
            <Form.Label>Price Range</Form.Label>
            <Form.Control
              as="select"
              value={priceRange}
              onChange={handlePriceRangeChange}
            >
              <option value="">All</option>
              <option value="0-50">$0 - $50</option>
              <option value="51-100">$51 - $100</option>
              <option value="101-200">$101 - $200</option>
              {/* Add more options as needed */}
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="minRating">
            <Form.Label>Rating</Form.Label>
            <Form.Control
              as="select"
              value={minRating}
              onChange={handleMinRatingChange}
            >
              <option value={0}>Any</option>
              <option value={1}>1 Star</option>
              <option value={2}>2 Stars</option>
              <option value={3}>3 Stars</option>
              <option value={4}>4 Stars</option>
              <option value={5}>5 Stars</option>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="category">
            <Form.Label>Category</Form.Label>
            <Form.Control
              as="select"
              value={category}
              onChange={handleCategoryChange}
            >
              <option value="">All</option>
              <option value="Electronics">Electronics</option>
              <option value="Clothing">Clothing</option>
              <option value="Books">Books</option>
              <option value="Accessories">Accessories</option>
              <option value="Sports">Sports</option>
              <option value="Home">Home</option>
              <option value="Health">Health</option>
              <option value="Beauty">Beauty</option>
              <option value="Outdoor">Outdoor</option>
              <option value="Kitchen">Kitchen</option>
              <option value="Baby">Baby</option>
            </Form.Control>
          </Form.Group>
        </Col>
        <Col md={9}>
          {loading ? (
            <Loader />
          ) : error ? (
            <Message variant="danger">{error}</Message>
          ) : (
            <>
              <Row>
                {products.map((product) => (
                  <Col key={product._id} sm={12} md={6} lg={4} xl={4}>
                    <Card className="my-3 p-3 rounded">
                      <Link to={`/product/${product._id}`}>
                        <Card.Img src={product.image} variant="top" />
                      </Link>
                      <Card.Body>
                        <Link to={`/product/${product._id}`}>
                          <strong>{product.name}</strong>
                        </Link>
                        <Card.Text as="div">
                          <Rating
                            value={product.rating}
                            text={`${product.numReviews} reviews`}
                          />
                        </Card.Text>
                        <Card.Text as="h3">${product.price}</Card.Text>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
              <Paginate
                pages={pages}
                page={page}
                keyword={keyword ? keyword : ""}
              />
            </>
          )}
        </Col>
      </Row>
    </>
  );
};

export default HomeScreen;
