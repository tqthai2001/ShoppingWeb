import React, { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { ToastContainer, toast } from "react-toastify";
import { connect } from "react-redux";
import { cancelOrder, startLogin, stopLogin } from "../../actions/user";
import currencyFormat from "../../utils/displayPrice";
import PageLoading from "../../pages/PageLoading";

import "react-toastify/dist/ReactToastify.css";
import "../../assets/style/style.css";

const DELETE_ORDER = gql`
  mutation Mutation($deleteOrderId: Int!) {
    deleteOrder(id: $deleteOrderId) {
      id
    }
  }
`;
const UserDetail = ({ user, login, logout, product, cancelOrder }) => {
  const arrOrder = user.orders.filter((item) => item.status === status) || [];
  const [showFile, setShowFile] = useState(true);
  const [waitConfirm, setWaitConfirm] = useState(1);
  const [status, setStatus] = useState("Chờ xử lý");
  const [deleteOrder, { loading, error }] = useMutation(DELETE_ORDER, {
    onCompleted: (data) => {
      toast.success("Hủy thành công");
      setWaitConfirm(4);
      setStatus("Hủy đơn hàng");
    },
  });

  if (loading) return <PageLoading />;
  if (!user.email) {
    return (
      <section className="ftco-section ftco-cart">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-12 text-center ftco-animate">
              <button
                type="button"
                className="btn btn-primary py-3 px-5"
                onClick={login}
              >
                Login to Continue
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <div>
      <section className="ftco-section contact-section bg-light">
        <div className="container">
          <div className="row block-9" style={{ flexWrap: "nowrap" }}>
            <div className="border-end bg-white" id="sidebar-wrapper">
              <div className="list-group list-group-flush">
                <a
                  className="list-group-item list-group-item-action list-group-item-light p-3"
                  onClick={() => setShowFile(true)}
                >
                  Your Infor
                </a>
                <a
                  className="list-group-item list-group-item-action list-group-item-light p-3"
                  onClick={() => setShowFile(false)}
                >
                  Your Orders
                </a>
                <a
                  className="list-group-item list-group-item-action list-group-item-light p-3"
                  onClick={logout}
                >
                  Logout
                </a>
              </div>
            </div>
            <div id="page-content-wrapper">
              <div className="container-fluid">
                <div>
                  {showFile ? (
                    <h1 className="mt-4">Your Information</h1>
                  ) : (
                    <ul className="nav nav-tabs">
                      <li
                        className="nav-item"
                        onClick={() => {
                          setWaitConfirm(1);
                          setStatus("Chờ xử lý");
                        }}
                      >
                        <a
                          className={
                            waitConfirm === 1 ? "nav-link active" : "nav-link"
                          }
                          href="#"
                        >
                          Chờ xử lý
                        </a>
                      </li>
                      <li
                        className="nav-item"
                        onClick={() => {
                          setWaitConfirm(2);
                          setStatus("Đang giao hàng");
                        }}
                      >
                        <a
                          className={
                            waitConfirm === 2 ? "nav-link active" : "nav-link"
                          }
                          href="#"
                        >
                          Đang giao hàng
                        </a>
                      </li>
                      <li
                        className="nav-item"
                        onClick={() => {
                          setWaitConfirm(3);
                          setStatus("Đã giao hàng");
                        }}
                      >
                        <a
                          className={
                            waitConfirm === 3 ? "nav-link active" : "nav-link"
                          }
                          href="#"
                        >
                          Đã giao hàng
                        </a>
                      </li>
                      <li
                        className="nav-item"
                        onClick={() => {
                          setWaitConfirm(4);
                          setStatus("Hủy đơn hàng");
                        }}
                      >
                        <a
                          className={
                            waitConfirm === 4 ? "nav-link active" : "nav-link"
                          }
                          href="#"
                        >
                          Hủy đơn hàng
                        </a>
                      </li>
                    </ul>
                  )}
                </div>
                <div>
                  {showFile ? (
                    <ul>
                      <li>Tên Khách Hàng: {user.name}</li>
                      <li>Số Điện Thoại: {user.phoneNumber}</li>
                      <li>Email: {user.email}</li>
                      <li>Địa Chỉ: {user.address}</li>
                    </ul>
                  ) : arrOrder.length === 0 ? (
                    <h6>Bạn không có đơn hàng nào</h6>
                  ) : (
                    arrOrder.map((item) => {
                      const arrProduct = item.namePro.map((pro) => {
                        return {
                          infor: pro,
                          img: product.find(
                            (item) =>
                              item.codePro ===
                              pro.slice(pro.length - 10, pro.length)
                          ),
                        };
                      });
                      return (
                        <div>
                          {waitConfirm === 1 && (
                            <div className="d-flex justify-content-end">
                              <button
                                type="button"
                                className="btn btn-danger"
                                onClick={() => {
                                  deleteOrder({
                                    variables: { deleteOrderId: item.id },
                                  });
                                  cancelOrder(item.id);
                                }}
                              >
                                Hủy đơn hàng
                              </button>
                            </div>
                          )}
                          {arrProduct.map((order, index) => {
                            var createdAt = new Date(
                              parseFloat(item.createdAt)
                            );
                            var updatedAt = new Date(
                              parseFloat(item.updatedAt)
                            );
                            return (
                              <ul>
                                <li
                                  className="header__cart-item"
                                  style={{ padding: "0", marginTop: "1rem" }}
                                  key={index}
                                >
                                  <img
                                    src={order.img.img_1}
                                    alt=""
                                    style={{ width: "10%" }}
                                  />
                                  <div
                                    className="d-flex flex-column"
                                    style={{ width: "100%" }}
                                  >
                                    <div
                                      className="header__cart-item-info d-flex justify-content-between"
                                      style={{ width: "100%" }}
                                    >
                                      <div>
                                        <h5
                                          className="header__cart-item-name"
                                          style={{ paddingLeft: "1rem" }}
                                        >
                                          {order.infor}
                                        </h5>
                                      </div>
                                      <div>
                                        <h5>
                                          {currencyFormat(order.img.price)}
                                        </h5>
                                      </div>
                                    </div>
                                    <div>
                                      <h5
                                        className="header__cart-item-name"
                                        style={{ paddingLeft: "1rem" }}
                                      >
                                        Ngày đặt: {createdAt.toLocaleString()}
                                      </h5>
                                    </div>
                                  </div>
                                </li>
                              </ul>
                            );
                          })}
                          <div className="d-flex justify-content-end">
                            <h5
                              style={{
                                padding: "1rem",
                                backgroundColor: "#e29481",
                              }}
                            >
                              Tổng giá tiền: {currencyFormat(item.price)}
                            </h5>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.User,
    product: [...state.Product, ...state.Accessory],
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    login: () => dispatch(startLogin()),
    logout: () => dispatch(stopLogin()),
    cancelOrder: (id) => dispatch(cancelOrder(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserDetail);
