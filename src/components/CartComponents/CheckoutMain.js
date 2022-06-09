import { useEffect, useState } from "react";
import { connect, useSelector } from "react-redux";
import { gql, useMutation } from "@apollo/client";
import { Link } from "react-router-dom";
import Popup from 'reactjs-popup';
import { ToastContainer, toast } from 'react-toastify';

import Validator from "./Validator"
import PageLoading from "../../pages/PageLoading"
import { history } from "../../router/AppRouter"
import { resetCart } from "../../actions/cart";
import { order } from "../../actions/user";
import currencyFormat from "../../utils/displayPrice";

import 'reactjs-popup/dist/index.css';
import 'react-toastify/dist/ReactToastify.css';
import "../../assets/style/style.css"
// import img-voucher

const ORDER = gql`
        mutation Mutation($data: createOrderInput!) {
            createOrder(data: $data) {
                id
                createdAt
                updatedAt
                namePro
                price
                status
            }
        }`;

const UPDATE_USER = gql`
        mutation Mutation($data: updateUserInput!, $email: String!) {
            updateUser(data: $data, email: $email) {
                    id
            }
        }`;

const Checkout = ({ resetCart, orderRedux }) => {
    const [show, setShow] = useState(false);
    const [coupon, setCoupon] = useState(-1);
    const [couponPre, setCouponPre] = useState(-1);
    const [isLoading, setIsLoading] = useState(false);
    const { user, cart, sale, vouchers, vouchersPremium, point } = useSelector((state) => ({
        user: state.User,
        cart: state.Cart,
        sale: state.Event,
        vouchers: state.Voucher,
        vouchersPremium: state.VoucherPremium,
        point: state.User.point,
        })
    );

    // Sum price not discount
    const total = cart.reduce((total, item) =>
        total + (item.price - (item.price * sale) / 100) * item.count, 0);
    const [couponRate, setCouponRate] = useState(0);
    const [couponRatePre, setCouponRatePre] = useState(0);
    const [order, { loading, error }] = useMutation(ORDER, {
        onCompleted: (data) => {
            orderRedux(data.createOrder);
            resetCart();
            setIsLoading(false);
            toast.success("Đặt hàng thành công");
            history.push("/");
        },
    });
    const [update] = useMutation(UPDATE_USER);
    const [data, setData] = useState({
        name: user.name,
        email: user.email,
        address: user.address,
        phoneNumber: user.phoneNumber,
    });
    
    const handlePayment = () => {
        const namePro = cart.map((item, index) => {
            return `${item.name} ${item.color} Size: ${item.size} Số lượng: ${item.count} Mã sản phẩm: ${item.codePro}`;
        });
        const price = cart.reduce((total, item) => total + item.price * item.count, 0);
        order({
            variables: {
                data: {
                    price: parseInt(total - (total * couponRate) / 100 - couponRatePre, 10),
                    namePro,
                    status: "Chờ xử lý",
                    userId: user.id,
                },
            },
        });

        update({
            variables: {
                data: {
                    name: data.name,
                    phoneNumber: data.phoneNumber,
                    address: data.address,
                },
                email: data.email,
            },
        });
    };
    
    // useEffect(() => {
    //     const inputs = Array.from(document.querySelectorAll("input[name]"));
    //     inputs.forEach((input) => {
    //         input.addEventListener("keypress", (e) => {
    //             if (e.key === "Enter") {
    //                 e.preventDefault();
    //             }
    //         });
    //     });
    
    //     Validator({
    //         form: "#checkout-form",
    //         formGroupSelector: ".form-group",
    //         errorSelector: ".form-message",
    //         rules: [
    //             Validator.isRequired("#fullname"),
    //             Validator.isRequired("#phone"),
    //             Validator.isRequired("#address"),
    //             Validator.isEmail("#emailaddress"),
    //         ],
    //         onSubmit: async function () {
    //             setIsLoading(true);
    //             await handlePayment();
    //         },
    //     });
    // });

    if (loading) return <PageLoading/>;
    if (isLoading) return <PageLoading/>;

    return (
        <div>
            <div className="hero-wrap hero-bread bg-img">
                <div className="container">
                    <div className="row no-gutters slider-text align-items-center justify-content-center">
                        <div className="col-md-9 ftco-animate text-center">
                            <h1 className="mb-0 bread">Checkout</h1>
                            <p className="breadcrumbs">
                                <span className="mr-2"><Link to="/">Home</Link></span>
                                <span><Link to="/cart">Cart</Link></span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
		
		    <section className="ftco-section">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-xl-8 ftco-animate">
                            {/* Form Infor */}
                            <form id="checkout-form" className="billing-form bg-light p-3 p-md-5">
                                <h3 className="mb-4 billing-heading">Billing Details</h3>
                                <div className="row align-items-end">
                                    <div className="col-md-12">
                                        <div className="form-group">
                                            <label for="fullname">Full Name</label>
                                            <input
                                                value={data.name}
                                                onChange = {(e) => setData({
                                                        ...data,
                                                        name: e.target.value,
                                                    })
                                                }
                                                id="fullname"
                                                name="fullname"
                                                type="text"
                                                placeholder="Your Fullname"
                                                className="form-control"
                                            />
                                            <span className="form-message"></span>
                                        </div>
                                    </div>
                                    <div className="w-100"></div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label for="phone">Phone</label>
                                            <input
                                                value={data.phoneNumber}
                                                onChange = {(e) => setData({
                                                        ...data,
                                                        phoneNumber: e.target.value,
                                                    })
                                                }
                                                id="phone"
                                                name="phone"
                                                type="text"
                                                placeholder="Your Phone Number"
                                                className="form-control"
                                            />
                                            <span className="form-message"></span>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label for="emailaddress">Email Address</label>
                                            <input
                                                readOnly={true}
                                                value={data.email}
                                                onChange = {(e) => setData({
                                                        ...data,
                                                        email: e.target.value,
                                                    })
                                                }
                                                id="emailaddress"
                                                name="emailaddress"
                                                type="text"
                                                placeholder="Your Email"
                                                className="form-control"
                                            />
                                            <span className="form-message"></span>
                                        </div>
                                    </div>
                                    <div className="w-100"></div>
                                    <div className="col-md-12">
                                        <div className="form-group">
                                            <label for="address">Street Address</label>
                                            <input
                                                value={data.address}
                                                onChange = {(e) => setData({
                                                        ...data,
                                                        address: e.target.value,
                                                    })
                                                }
                                                id="address"
                                                name="address"
                                                type="text"
                                                placeholder="Your Address"
                                                className="form-control"
                                            />
                                            <span className="form-message"></span>
                                        </div>
                                    </div>
                                    <div className="w-100"></div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label for="towncity">Town / City</label>
                                            <input type="text" className="form-control" placeholder=""/>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label for="postcodezip">Postcode / ZIP *</label>
                                            <input type="text" className="form-control" placeholder=""/>
                                        </div>
                                    </div>
                                    <div className="w-100"></div>
                                    <div className="col-md-12">
                                        <div className="form-group">
                                            <label for="country">Shipping Method</label>
                                            <div className="select-wrap">
                                                <div className="icon"><span className="fas fa-angle-down"></span></div>
                                                <select name="" id="" className="form-control">
                                                    <option value="">Giao hàng Nhanh</option>
                                                    <option value="">Giao hàng Hỏa tốc</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="w-100"></div>
                                    <div className="col-md-12">
                                        <div className="form-group mt-4">
                                        </div>
                                    </div>
                                </div>
                            </form>
                            <div className="row mt-5 pt-3 d-flex">
                                <div className="col-md-6 d-flex">
                                    <Link to="/account">
                                        <label className="mr-3"><button className="btn btn-primary py-3 px-4"> Create Account </button></label>
                                    </Link>
                                    <label>
                                        <Popup trigger={<button className="btn btn-primary py-3 px-4"> Shop Voucher </button>} modal nested>
                                            {
                                                close => (
                                                    <div className="container">
                                                        <div className="modal-header">
                                                            <div className="">Chọn Voucher</div>
                                                            <div>
                                                                {point} <span className="fas fa-award"></span>
                                                            </div>
                                                        </div>
                                                        <div className="modal-body">
                                                            {
                                                                vouchers.map((voucher, index) => (
                                                                    <div className="form-group">
                                                                        <div className="col-md-12"
                                                                            style={ index === coupon ? total < voucher.condition ? {
                                                                                background: "#a3423c",
                                                                                color: "white",
                                                                            } : {
                                                                                background: "#b4fe99",
                                                                                color: "black",
                                                                                fontWeight: 500,
                                                                            } : {}
                                                                            }
                                                                        >                                                                    
                                                                            <div className="col-md-12">
                                                                                <div className="radio">
                                                                                    <label>
                                                                                        <input type="radio" name="optradio" className="mr-2"
                                                                                        onChange={(e) => {
                                                                                            setCoupon(index);
                                                                                        }}
                                                                                        />
                                                                                        <span>
                                                                                            <div className="discount-item-thumbnail-text">
                                                                                                Tất cả sản phẩm
                                                                                            </div>
                                                                                            <div className="discount-item__name">
                                                                                                Giảm {voucher.disCount}% giá trị đơn hàng
                                                                                            </div>
                                                                                            <div className="discount-item__condition">
                                                                                                Đơn tối thiểu {currencyFormat(voucher.condition)}đ
                                                                                            </div>
                                                                                        </span>
                                                                                    </label>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                ))
                                                            }
                                                        </div>
                                                        <div className="modal-footer">
                                                            <button onClick={() => {
                                                                if (coupon > 0 && total < vouchers[coupon].condition) {
                                                                    setCouponRate(0);
                                                                }
                                                                const index = coupon;
                                                                if (index < 0) toast.warning("Vui lòng chọn voucher");
                                                                else {
                                                                    setCouponRate(vouchers[index].disCount);
                                                                    toast.success("Áp dụng voucher thành công");
                                                                }
                                                            }}
                                                            >
                                                                OK
                                                            </button>
                                                            <button onClick={close}>Close</button>
                                                        </div>
                                                    </div>
                                                )
                                            }
                                        </Popup>
                                    </label>
                                </div>
                            </div>

                            <div className="row mt-5 pt-3 d-flex">
                                {/* Sum Price */}
                                <div className="col-md-6 d-flex">
                                    <div className="cart-detail cart-total bg-light p-3 p-md-4">
                                        <h3 className="billing-heading mb-4">Cart Total</h3>
                                        <p className="d-flex">
                                            <span>Subtotal</span>
                                            <span>${currencyFormat(parseInt(total, 10))}</span>
                                        </p>
                                        <p className="d-flex">
                                            <span>Delivery</span>
                                            <span>$0.00</span>
                                        </p>
                                        <p className="d-flex">
                                            <span>Discount</span>
                                            <span>${currencyFormat(parseInt((total * couponRate / 100) + couponRatePre, 10))}</span>
                                        </p>
                                        <p className="d-flex">
                                            <span>Bonus Point</span>
                                            <span>{currencyFormat(parseInt((total - (total * couponRate / 100) - couponRatePre) / 1000, 10))}</span>
                                        </p>
                                        <hr/>
                                        <p className="d-flex total-price">
                                            <span>Total</span>
                                            <span>${currencyFormat(parseInt(total - (total * couponRate / 100) - couponRatePre, 10))}</span>
                                        </p>
                                    </div>
                                </div>
                                {/* Payment Method */}
                                <div className="col-md-6">
                                    <div className="cart-detail bg-light p-3 p-md-4">
                                        <h3 className="billing-heading mb-4">Payment Method</h3>
                                        <div className="form-group">
                                            <div className="col-md-12">
                                                <div className="radio">
                                                    <label><input type="radio" name="optradio" className="mr-2"/> Direct Bank Tranfer</label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <div className="col-md-12">
                                                <div className="radio">
                                                    <label><input type="radio" name="optradio" className="mr-2"/> Check Payment</label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <div className="col-md-12">
                                                <div className="radio">
                                                    <label><input type="radio" name="optradio" className="mr-2"/> Paypal</label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <div className="col-md-12">
                                                <div className="checkbox">
                                                    <label><input type="checkbox" value="" className="mr-2"/> I have read and accept the terms and conditions</label>
                                                </div>
                                            </div>
                                        </div>
                                        <p><Link to="#"className="btn btn-primary py-3 px-4">Place an order</Link></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <ToastContainer/>
            </section> 
        </div>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        resetCart: () => dispatch(resetCart()),
        orderRedux: (data) => dispatch(order(data)),
    };
};

export default connect(null, mapDispatchToProps)(Checkout);
