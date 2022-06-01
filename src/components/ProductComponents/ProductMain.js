import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import Slider from 'react-slick'
import currencyFormat from '../../utils/displayPrice'

import "../../assets/style/style.css"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

const ProductMain = ({data, sale}) => {
    var settings = {
        dots: true,
        infinite: true,
        autoplay: false,
        autoplaySpeed: 5000,
        arrows: true,
        slidesToShow: 1,
        rows: 2,
        slidesPerRow: 4
    };

    return (
        <div>
            <section className="ftco-section bg-light">
                <div className="container-fluid">
                    <Slider {...settings}>
                        {data.map((item, index) => {
                            return (
                                <div className="col-md-12">
                                    <div className="owl-carousel ftco-animate"></div>
                                    <div className="product" key={index}>
                                        <Link to={`/detail/${item.codePro}`} className="img-prod">
                                            <img className="img-fluid" src={item.img_1} alt="Product-Image"/>
                                            <span className="status">
                                                Sale Up To 70%
                                            </span>
                                        </Link>
                                        <div className="text py-3 px-3">
                                            <h3><Link to={`/detail/${item.codePro}`}>{item.name}</Link></h3>
                                            <div className="d-flex">
                                                <div className="pricing">
                                                    {
                                                        sale?
                                                        <p className="price">
                                                            <span className="mr-2 price-dc">${currencyFormat(item.price)}</span>
                                                            <span className="price-sale">${currencyFormat(parseInt(item.price-item.price*sale/100, 10))}</span>
                                                        </p>
                                                        :
                                                        <p className="price">
                                                            <span className="price">${currencyFormat(item.price)}</span>
                                                        </p>
                                                    }
                                                </div>
                                                <div className="rating">
                                                    <p className="text-right">
                                                        <span className="fa-solid fa-star" style={{color: '#d26e4b'}}></span>
                                                        <span className="fa-solid fa-star" style={{color: '#d26e4b'}}></span>
                                                        <span className="fa-solid fa-star" style={{color: '#d26e4b'}}></span>
                                                        <span className="fa-solid fa-star" style={{color: '#d26e4b'}}></span>
                                                        <span className="fa-solid fa-star" style={{color: '#d26e4b'}}></span>
                                                    </p>
                                                </div>
                                            </div>
                                            <hr/>
                                            <Link to={`/detail/${item.codePro}`} className="add-to-cart">
                                                <p className="bottom-area d-flex">
                                                        <span>Add to cart <i className="fas fa-cart-plus" style={{marginLeft: '10px', fontSize: '15px'}}></i></span>
                                                </p>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </Slider>
                </div>
            </section>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        sale: state.Event
    }
}

export default connect(mapStateToProps)(ProductMain)
