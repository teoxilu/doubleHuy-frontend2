import React, { useEffect, Suspense } from 'react';
import { auth } from './firebase';
import { useDispatch } from 'react-redux';
import { LoadingOutlined } from '@ant-design/icons';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { lazy } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ChatBot from './components/chat/ChatBot';
// import ChatComponent from './components/chat/ChatComponent.js';

import { currentUser } from './functions/auth';

const SideDrawer = lazy(() => import('~/components/drawer/SideDrawer'));
const StickyHeader = lazy(() => import('~/components/StickyHeader'));
const Footer = lazy(() => import('~/components/Footer'));
const Home = lazy(() => import('~/pages/Home'));
const Login = lazy(() => import('~/pages/auth/Login'));
const Register = lazy(() => import('~/pages/auth/Register'));
const RegisterComplete = lazy(() => import('~/pages/auth/RegisterComplete'));
const ForgotPassword = lazy(() => import('~/pages/auth/ForgotPassword'));
const History = lazy(() => import('~/pages/user/History'));
const UserRoute = lazy(() => import('~/components/routes/UserRoute'));
const AdminRoute = lazy(() => import('~/components/routes/AdminRoute'));
const Password = lazy(() => import('~/pages/user/Password'));
const Wishlist = lazy(() => import('~/pages/user/Wishlist'));
const AdminDashboard = lazy(() => import('~/pages/admin/AdminDashboard'));
const CategoryCreate = lazy(() => import('~/pages/admin/category/CategoryCreate'));
const CategoryUpdate = lazy(() => import('~/pages/admin/category/CategoryUpdate'));
const CategoryHome = lazy(() => import('~/pages/category/CategoryHome'));
const SubCreate = lazy(() => import('~/pages/admin/sub/SubCreate'));
const ProductCreate = lazy(() => import('~/pages/admin/product/ProductCreate'));
const AllProducts = lazy(() => import('~/pages/admin/product/AllProducts'));
const ProductUpdate = lazy(() => import('~/pages/admin/product/ProductUpdate'));
const Product = lazy(() => import('~/pages/Product'));
const SubHome = lazy(() => import('~/pages/sub/SubHome'));
const Shop = lazy(() => import('~/pages/Shop'));
const Cart = lazy(() => import('~/pages/Cart'));
const Checkout = lazy(() => import('~/pages/Checkout'));
const CreateCouponPage = lazy(() => import('~/pages/admin/coupon/CreateCouponPage'));
const Payment = lazy(() => import('~/pages/Payment'));
const SubUpdate = lazy(() => import('~/pages/admin/sub/SubUpdate'));

const App = () => {
    const dispatch = useDispatch();

    //check Firebase auth state
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            if (user) {
                const idTokenResult = await user.getIdTokenResult();

                currentUser(idTokenResult.token)
                    .then((res) => {
                        dispatch({
                            type: 'LOGGED_IN_USER',
                            payload: {
                                name: res.data.name,
                                email: res.data.email,
                                token: idTokenResult.token,
                                role: res.data.role,
                                _id: res.data._id,
                            },
                        });
                    })
                    .catch((err) => console.log(err));
            }
        });
        //cleanup
        return () => unsubscribe();
    }, [dispatch]);

    return (
        <Suspense
            fallback={
                <div className="col text-center p-5">
                    2HS Shoe Shop{' '}
                    <LoadingOutlined /> Please wait...
                </div>
            }
        >
            <BrowserRouter>
                <StickyHeader />
                <SideDrawer />
                <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                    // transition={Bounce}
                />
                <Switch>
                        <Route exact path="/" component={Home} />
                        <Route exact path="/login" component={Login} />
                        <Route exact path="/register" component={Register} />
                        <Route exact path="/register/complete" component={RegisterComplete} />
                        <Route exact path="/forgot/password" component={ForgotPassword} />
                        <UserRoute exact path="/user/history" component={History} />
                        <UserRoute exact path="/user/password" component={Password} />
                        <UserRoute exact path="/user/wishlist" component={Wishlist} />
                        <AdminRoute exact path="/admin/dashboard" component={AdminDashboard} />
                        <AdminRoute exact path="/admin/category" component={CategoryCreate} />
                        <AdminRoute exact path="/admin/category/:slug" component={CategoryUpdate} />
                        <AdminRoute exact path="/admin/sub" component={SubCreate} />
                        <AdminRoute exact path="/admin/sub/:slug" component={SubUpdate} />
                        <AdminRoute exact path="/admin/product" component={ProductCreate} />
                        <AdminRoute exact path="/admin/products" component={AllProducts} />
                        <AdminRoute exact path="/admin/coupon" component={CreateCouponPage} />
                        <AdminRoute exact path="/admin/product/:slug" component={ProductUpdate} />
                        <Route exact path="/product/:slug" component={Product} />
                        <Route exact path="/category/:slug" component={CategoryHome} />
                        <Route exact path="/sub/:slug" component={SubHome} />
                        <Route exact path="/shop" component={Shop} />
                        <Route exact path="/cart" component={Cart} />
                        <Route exact path="/checkout" component={Checkout} />
                        <Route exact path="/payment" component={Payment} />
                </Switch>
                {/* <ChatBot /> */}
                <Footer />
            </BrowserRouter>
        </Suspense>
    );
};

export default App;
