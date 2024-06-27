import React, { useState, useEffect } from 'react';
import { getProductsByCount, fetchProductsByFilter } from '../functions/product';
import { getCategories } from '../functions/category';
import { getSubs } from '../functions/sub';
import { useSelector, useDispatch } from 'react-redux';
import ProductCard from '~/components/cards/ProductCard';
import { Menu, Slider, Checkbox, Radio } from 'antd';
import { DollarOutlined, DownSquareOutlined, StarOutlined } from '@ant-design/icons';
import Star from '../components/forms/Star';
import { Typography } from '@material-tailwind/react';
import {useDebounce} from '~/hooks'
const { SubMenu, ItemGroup } = Menu;

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [price, setPrice] = useState([0, 0]);
    const [ok, setOk] = useState(false);
    const [categories, setCategories] = useState([]);
    const [categoryIds, setCategoryIds] = useState([]);
    const [star, setStar] = useState('');
    const [subs, setSubs] = useState([]);
    const [sub, setSub] = useState('');
    const [brands, setBrands] = useState([
        'Last Resort AB',
        'DC',
        'Adidas',
        'Nike',
        'Asics',
        'Yonex',
        'Salomon',
        'Vans',
        'Converse',
    ]);
    const [brand, setBrand] = useState('');
    const [sizes, setSizes] = useState([
        '37',
        '38',
        '39',
        '40',
        '41',
        '42',
        '42.5',
        '43',
        '44',
        '40.5',
        '41.5',
        '43.5',
        '36',
    ]);
    const [size, setSize] = useState('');


    let dispatch = useDispatch();
    let { search } = useSelector((state) => ({ ...state }));
    const { text } = search;

    
    useEffect(() => {
        loadAllProducts();
        // fetch categories
        getCategories().then((res) => setCategories(res.data));
        // fetch subcategories
        getSubs().then((res) => setSubs(res.data));
    }, []);

    const fetchProducts = (arg) => {
        fetchProductsByFilter(arg).then((res) => {
            setProducts(res.data);
        });
    };

    // 1. load products by default on page load
    const loadAllProducts = () => {
        getProductsByCount(12).then((p) => {
            setProducts(p.data);
            setLoading(false);
        });
    };

    // 2. load products on user search input
    useEffect(() => {
        const delayed = setTimeout(() => {
            fetchProducts({ query: text });
            if (!text) {
                loadAllProducts();
            }
        }, 300);
        return () => clearTimeout(delayed);
    }, [text]);

    // 3. load products based on price range
    useEffect(() => {
        console.log('ok to request');
        fetchProducts({ price });
    }, [ok]);

    const handleSlider = (value) => {
        dispatch({
            type: 'SEARCH_QUERY',
            payload: { text: '' },
        });

        // reset
        setCategoryIds([]);
        setPrice(value);
        setStar('');
        setSub('');
        setBrand('');
        setSize('');
        setTimeout(() => {
            setOk(!ok);
        }, 300);
    };

    // 4. load products based on category
    // show categories in a list of checkbox
    const showCategories = () =>
        categories.map((c) => (
            <div key={c._id}>
                <Checkbox
                    onChange={handleCheck}
                    className="pb-2 pl-4 pr-4"
                    value={c._id}
                    name="category"
                    checked={categoryIds.includes(c._id)}
                >
                    {c.name}
                </Checkbox>
                <br />
            </div>
        ));

    // handle check for categories
    const handleCheck = (e) => {
        // reset
        dispatch({
            type: 'SEARCH_QUERY',
            payload: { text: '' },
        });
        setPrice([0, 0]);
        setStar('');
        setSub('');
        setBrand('');
        setSize('');
        // console.log(e.target.value);
        let inTheState = [...categoryIds];
        let justChecked = e.target.value;
        let foundInTheState = inTheState.indexOf(justChecked); // index or -1

        // indexOf method ?? if not found returns -1 else return index [1,2,3,4,5]
        if (foundInTheState === -1) {
            inTheState.push(justChecked);
        } else {
            // if found pull out one item from index
            inTheState.splice(foundInTheState, 1);
        }

        setCategoryIds(inTheState);
        // console.log(inTheState);
        fetchProducts({ category: inTheState });
    };

    // 5. show products by star rating
    const handleStarClick = (num) => {
        // console.log(num);
        dispatch({
            type: 'SEARCH_QUERY',
            payload: { text: '' },
        });
        setPrice([0, 0]);
        setCategoryIds([]);
        setStar(num);
        setSub('');
        setBrand('');
        setSize('');
        fetchProducts({ stars: num });
    };

    const showStars = () => (
        <div className="pr-4 pl-4 pb-2">
            <Star starClick={handleStarClick} numberOfStars={5} />
            <Star starClick={handleStarClick} numberOfStars={4} />
            <Star starClick={handleStarClick} numberOfStars={3} />
            <Star starClick={handleStarClick} numberOfStars={2} />
            <Star starClick={handleStarClick} numberOfStars={1} />
        </div>
    );

    // 6. show products by sub category
    const showSubs = () =>
        subs.map((s) => (
            <div
                key={s._id}
                onClick={() => handleSub(s)}
                className="p-1 m-1 badge badge-secondary"
                style={{ cursor: 'pointer' }}
            >
                {s.name}
            </div>
        ));

    const handleSub = (sub) => {
        // console.log("SUB", sub);
        setSub(sub);
        dispatch({
            type: 'SEARCH_QUERY',
            payload: { text: '' },
        });
        setPrice([0, 0]);
        setCategoryIds([]);
        setStar('');
        setBrand('');
        setSize('');
        fetchProducts({ sub });
    };

    // 7. show products based on brand name
    const showBrands = () =>
        brands.map((b) => (
            <Radio key={b} value={b} name={b} checked={b === brand} onChange={handleBrand} className="pb-1 pl-4 pr-4">
                {b}
            </Radio>
        ));

    const handleBrand = (e) => {
        setSub('');
        dispatch({
            type: 'SEARCH_QUERY',
            payload: { text: '' },
        });
        setPrice([0, 0]);
        setCategoryIds([]);
        setStar('');
        setSize('');
        setBrand(e.target.value);
        fetchProducts({ brand: e.target.value });
    };

    // 8. show products based on size
    const showSizes = () =>
        sizes.map((s) => (
            <Radio key={s} value={s} name={s} checked={s === size} onChange={handleSize} className="pb-1 pl-4 pr-4">
                {s}
            </Radio>
        ));

    const handleSize = (e) => {
        setSub('');
        dispatch({
            type: 'SEARCH_QUERY',
            payload: { text: '' },
        });
        setPrice([0, 0]);
        setCategoryIds([]);
        setStar('');
        setBrand('');
        setSize(e.target.value);
        fetchProducts({ size: e.target.value });
    };

  

    return (
        <div className="grid grid-cols-12 px-40 pt-28 gap-x-2">
            <div className="col-span-3">
                <Menu
                    defaultOpenKeys={['1', '2', '3', '4', '5', '6']}
                    mode="inline"
                    className="bg-light-surface-container-lowest shadow-xl shadow-light-outline"
                    borderRadius={24}
                >
                    {/* price */}
                    <SubMenu
                        key="1"
                        title={
                            <span className="font-normal text-base text-light-on-surface">
                                <DollarOutlined /> Price
                            </span>
                        }
                    >
                        <div>
                            <Slider
                                className="ml-4 mr-4"
                                formatter={(v) => `${v} VND`}
                                range
                                value={price}
                                onChange={handleSlider}
                                max="5000000"
                            />
                        </div>
                    </SubMenu>

                    {/* brands */}
                    <SubMenu
                        key="2"
                        title={
                            <span className="font-normal text-base text-light-on-surface">
                                <DownSquareOutlined /> Brands
                            </span>
                        }
                    >
                        <div style={{ maringTop: '-10px' }} className="pr-5">
                            {showBrands()}
                        </div>
                    </SubMenu>

                    {/* Rating */}
                    <SubMenu
                        key="3"
                        title={
                            <span className="font-normal text-base text-light-on-surface">
                                <StarOutlined /> Rating
                            </span>
                        }
                    >
                        <div style={{ maringTop: '-10px' }}>{showStars()}</div>
                    </SubMenu>

                    {/* size */}
                    <SubMenu
                        key="4"
                        title={
                            <span className="font-normal text-base text-light-on-surface">
                                <DownSquareOutlined /> Sizes
                            </span>
                        }
                    >
                        <div style={{ maringTop: '-10px' }} className="pr-5">
                            {showSizes()}
                        </div>
                    </SubMenu>

                    {/* category */}
                    <SubMenu
                        key="5"
                        title={
                            <span className="font-normal text-base text-light-on-surface">
                                <DownSquareOutlined /> Categories
                            </span>
                        }
                    >
                        <div style={{ maringTop: '-10px' }}>{showCategories()}</div>
                    </SubMenu>

                    {/* sub category */}
                    <SubMenu
                        key="6"
                        title={
                            <span className="font-normal text-base text-light-on-surface">
                                <DownSquareOutlined /> Sub Categories
                            </span>
                        }
                    >
                        <div style={{ maringTop: '-10px' }} className="pl-4 pr-4">
                            {showSubs()}
                        </div>
                    </SubMenu>
                </Menu>
            </div>

            <div className="col-span-9">
                {loading ? <h4 className="text-3xl text-danger text-center translate-y-16">Loading...</h4> : <></>}

                {products.length < 1 ? (
                    <Typography className="text-3xl text-center translate-y-16 ">No products found</Typography>
                ) : (
                    <div className="grid grid-cols-3">
                        {products.map((p) => (
                            <div key={p._id} className="col-md-4 mt-3">
                                <ProductCard product={p} />
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Shop;
