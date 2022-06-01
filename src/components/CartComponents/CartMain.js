import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import Popup from 'reactjs-popup';
import { ToastContainer, toast } from 'react-toastify';
import { changeQuantity, removeCart } from '../../actions/cart'
import currencyFormat from '../../utils/displayPrice'
import { history } from '../../router/AppRouter'

import 'reactjs-popup/dist/index.css';
import 'react-toastify/dist/ReactToastify.css';
import "../../assets/style/style.css"

const CartMain = ({user, cart, dispatch, sale}) => {
    let totalCost = cart.reduce(
        (total, item) => total + (item.price - (item.price * sale) / 100) * item.count, 0
    )
    return (
        <div>
            <div className="hero-wrap hero-bread bg-img">
                <div className="container">
                    <div className="row no-gutters slider-text align-items-center justify-content-center">
                        <div className="col-md-9 ftco-animate text-center">
                            <h1 className="mb-0 bread">My Cart</h1>
                            <p className="breadcrumbs">
                                <span className="mr-2"><Link to="/">Home</Link></span>
                                <span>Cart</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            {
                cart.length > 0 ? (
                    <div>
                        <section className="ftco-section ftco-cart">
                            <div className="container">
                                <div className="row">
                                    <div className="col-md-12 ftco-animate">
                                        <div className="cart-list">
                                            <table className="table">
                                                <thead className="thead-primary">
                                                    <tr className="text-center">
                                                        <th>&nbsp;</th>
                                                        <th>Image</th>
                                                        <th>Product</th>
                                                        <th>Price</th>
                                                        <th>Quantity</th>
                                                        <th>Total</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {cart.map((product, index) => (
                                                        <tr className="text-center" key={index}>
                                                            <td className="product-remove">
                                                                <span>
                                                                <Popup trigger={<button className="fas fa-close px-3" style={{outline: 'none'}}></button>} modal nested>
                                                                    {close => (
                                                                        <div>
                                                                            <div className="modal-header text-uppercase" style={{background: '#ffc107'}}>
                                                                                <h6 className="modal-title">Confirm Delete This Product</h6>
                                                                                <div className="close fas fa-close" onClick={close}></div>
                                                                            </div>                                                                
                                                                            <div className="modal-footer">
                                                                                <button onClick={() => {
                                                                                    dispatch(removeCart(product.id, product.size));
                                                                                }}>OK</button>
                                                                                <button onClick={close}>Cancel</button>
                                                                            </div>
                                                                        </div>
                                                                    )}
                                                                </Popup>
                                                                </span>
                                                            </td>
                                                            <td className="image-prod">
                                                                <div className="img">
                                                                    <img src={product.img_1} style={{width: '100%'}} alt="Cart-Image"/>
                                                                </div>
                                                            </td>
                                                            <td className="product-name">
                                                                <h3>{product.name}</h3>
                                                                <p>{product.color} - {product.size}</p>
                                                            </td>
                                                            <td className="price">
                                                                {currencyFormat(parseInt(product.price - (product.price * sale / 100), 10))}
                                                            </td>
                                                            <td className="quantity">
                                                                <div className="input-group" style={{justifyContent: 'center'}}>
                                                                    <td className="product-remove"
                                                                        onClick={() => {
                                                                            if (product.count > 0) {
                                                                                dispatch(changeQuantity(
                                                                                    product.id, product.size, product.count - 1,
                                                                                ))
                                                                            }
                                                                        }}
                                                                    >
                                                                    <div>
                                                                        <span className="fas fa-minus"></span>
                                                                    </div>
                                                                    </td>
                                                                    <td className="product-remove">
                                                                        <span>{product.count}</span>
                                                                    </td>
                                                                    <td className="product-remove"
                                                                        onClick={() => {
                                                                            dispatch(changeQuantity(
                                                                                product.id, product.size, product.count + 1,
                                                                            ))
                                                                        }}
                                                                    >
                                                                    <div>
                                                                        <span className="fas fa-plus"></span>
                                                                    </div>
                                                                    </td>
                                                                </div>
                                                            </td>
                                                            <td className="total">
                                                                {currencyFormat(parseInt((product.price - (product.price * sale / 100)) * product.count, 10))}
                                                            </td>
                                                        </tr> 
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                                <div className="row justify-content-end">
                                    <div className="col col-lg-5 col-md-6 mt-5 cart-wrap ftco-animate">
                                        <div className="cart-total mb-3">
                                            <h3>Cart Totals</h3>
                                            <p className="d-flex">
                                                <span>Subtotal</span>
                                                <span>
                                                    {currencyFormat(parseInt(totalCost, 10))}
                                                </span>
                                            </p>
                                            <p className="d-flex">
                                                <span>Delivery</span>
                                                <span>$0.00</span>
                                            </p>
                                            <hr/>
                                            <p className="d-flex total-price">
                                                <span>Total</span>
                                                <span>
                                                    {currencyFormat(parseInt(totalCost, 10))}
                                                </span>
                                            </p>
                                        </div>
                                        <p className="text-center">
                                            <button id="checkout" className="btn btn-primary py-3 px-4"
                                                onClick={() => {
                                                    if (currencyFormat(parseInt(totalCost, 10)) == 0) {
                                                        toast.error("Giỏ hàng trống")
                                                    }
                                                    else {
                                                        history.push("/checkout")
                                                    }
                                                }}
                                            > Proceed to Checkout </button>
                                            <ToastContainer/>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                ) : (
                    <div>
                        <section className="ftco-section ftco-cart">
                            <div className="container">
                                <div className="row justify-content-center mb-3 pb-3">
                                    <div className="col-md-12 heading-section head-link text-center ftco-animate">
                                        <div><h6>Giỏ hàng của bạn đang trống</h6></div>
                                        <Link to="/products">
                                        <div><span className="fas fa-reply"></span><p>Tiếp tục mua hàng</p></div>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                )
            }
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        user: state.User,
        cart: state.Cart,
        sale: state.Event,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        dispatch
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CartMain)