"use client";
import UserHeader from "../Components/UserHeader";
import Link from "next/link";
import { MagnifyingGlassIcon, StarIcon } from "@heroicons/react/20/solid";
import { Bars3BottomLeftIcon } from "@heroicons/react/24/outline";
import React, { useState, useEffect } from "react";
import UserFooter from "../Components/UserFooter";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationCrosshairs } from "@fortawesome/free-solid-svg-icons";
import { format } from "date-fns";
import productData from "../api/cards/product.json";

export default function ProductCards() {
  const initialVisibleCount = 5;
  const [visibleCount, setVisibleCount] = useState(initialVisibleCount);
  const paragraphs = [
    "Birthday Special Decors",
    "Candlelight Dinners",
    "Birthday Cakes",
    "Birthday Surprises",
    "Couple Activities",
    "Birthday Cakes",
    "Birthday Special Decors",
    "Candlelight Dinners",
    "Birthday Cakes",
    "Birthday Surprises",
    "Couple Activities",
    "Birthday Cakes",
    "Birthday Special Decors",
    "Candlelight Dinners",
    "Birthday Cakes",
    "Birthday Surprises",
    "Couple Activities",
    "Birthday Cakes",
  ];
  const [posts, setPosts] = useState([]);

  const [showMoreButton, setShowMoreButton] = useState(false);
  const [fullContentVisible, setFullContentVisible] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [screenWidth, setScreenWidth] = useState(null);
  const [users, setUsers] = useState([]);
  const [product, setProduct] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://668fa500c0a7969efd98d6ba.mockapi.io/api/product-cards/users"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok.");
        }
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await fetch(
          " https://api.escuelajs.co/api/v1/products"
        );
        if (response.ok) {
          const data = await response.json();
          setProduct(data.slice(0, 4));
        } else {
          throw new Error("Failed to fetch posts");
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    }

    fetchPosts();
  }, []);
  if (!product) return <div>Loading...</div>;
  useEffect(() => {
    setPosts(productData.productCards);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      const newScreenWidth =
        typeof window !== "undefined" ? window.innerWidth : null;
      setScreenWidth(newScreenWidth);

      const newVisibleCount = newScreenWidth >= 768 ? 13 : 5;
      setVisibleCount(newVisibleCount);
      setShowMoreButton(newVisibleCount < paragraphs.length);
      setFullContentVisible(false);
    };

    // Initial handleResize call
    handleResize();

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Cleanup: remove event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [paragraphs.length]);

  // Check if screenWidth is null to prevent rendering on the server-side
  if (screenWidth === null) {
    return null;
  }

  const toggleContent = () => {
    setFullContentVisible(!fullContentVisible);
    setVisibleCount(
      fullContentVisible ? (screenWidth >= 768 ? 13 : 5) : paragraphs.length
    );
  };
  // const [favorites, setFavorites] = useState([]);

  const toggleFavorite = (postId) => {
    setFavorites((prevFavorites) =>
      prevFavorites.includes(postId)
        ? prevFavorites.filter((id) => id !== postId)
        : [...prevFavorites, postId]
    );
  };

  const openModal = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedProduct(null);
    setIsModalOpen(false);
  };

  return (
    <>
      <div
        className={`flex h-full ${isModalOpen ? " blur-md" : "bg-userTheme "}`}
      >
        <div className="flex flex-1 flex-col overflow-hidden">
          <UserHeader value1={true} />
          {/* hero section */}
          <section className="hero-section w-full h-auto top-10 relative mb-10 sm:mb-20 lg:h-[75%] bg-userTheme">
            <div className="containerBox relative md:left-20 lg:left-32">
              <div className=" pt-0 flex flex-col mt-36 ">
                <h1 className=" font-light text-dark mb-5 sm:mb-10 sm:w-[55%] text-5xl leading-[1.3]">
                  We set up your space to celebrate your{" "}
                  <span className="font-bold">Birthday Party</span>
                </h1>
                <div className="flex flex-col md:flex-row justify-around sm:w-[60%] md:w-[70%] xl:w-[40%] mb-7 space-y-3 sm:space-y-0 w-auto items-start">
                  <div className="flex items-center">
                    <img
                      src="https://i.ibb.co/bLBTvQf/image.png"
                      alt="gallery image"
                      border="0"
                      className="w-7 h-7 mr-2"
                    />
                    <p>Browse gallery</p>
                  </div>
                  <div className="flex items-center">
                    <img
                      src="https://i.ibb.co/0Yc8CgJ/scan.png"
                      alt="search image"
                      border="0"
                      className="w-7 h-7 mr-2"
                    />
                    <p>Find Inspiration</p>
                  </div>
                  <div className="flex items-center">
                    <img
                      src="https://i.ibb.co/RQwkHB1/users.png"
                      alt="profile image"
                      border="0"
                      className="w-7 h-7 mr-2"
                    />
                    <p>Hire Professionals</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col md:flex-row flex-1 md:items-center justify-center lg:justify-start mb-7 sm:w-[80%]">
                <div className="w-full mb-5 md:mb-0 max-w-lg lg:max-w-xs">
                  <label htmlFor="search" className="sr-only">
                    Search Service, Professionals etc.
                  </label>
                  <div className="relative" dir="ltr">
                    <div className="pointer-events-none absolute inset-y-0 right-7 flex items-center pl-3">
                      <MagnifyingGlassIcon
                        className="h-5 w-5 text-black"
                        aria-hidden="true"
                      />
                    </div>
                    <input
                      id="search"
                      name="search"
                      className="block w-full rounded-md md:rounded-s-md md:rounded-e-none border-r bg-white py-3 pl-6 pr-3 shadow-md text-gray-900 placeholder:text-gray-400 outline-none sm:text-sm sm:leading-6"
                      placeholder="Search Service, Professionals etc."
                      type="text"
                      autoComplete="off"
                    />
                  </div>
                </div>
                <div className="w-full max-w-lg lg:max-w-xs">
                  <label htmlFor="search" className="sr-only">
                    Enter Location
                  </label>
                  <div className="relative">
                    <div className="location-input pointer-events-none absolute inset-y-0 right-7 flex items-center pl-3">
                      <FontAwesomeIcon icon={faLocationCrosshairs} />
                    </div>
                    <input
                      id="Enter-Location"
                      name="search"
                      className="block w-full rounded-md md:rounded-e-md md:rounded-s-none bg-white py-3 pl-6 pr-3 shadow-md text-gray-900 placeholder:text-gray-400 outline-none sm:text-sm sm:leading-6"
                      placeholder="Enter Location"
                      type="text"
                      autoComplete="off"
                    />
                  </div>
                </div>
              </div>
              <button className="py-1 px-10 w-full sm:max-w-[280px] sm:py-3 sm:px-5  bg-primaryColor text-white rounded-md text-lg">
                Search Professionals
              </button>
            </div>
            <div className="mt-10 sm:mt-28 containerBox w-full relative top-14 lg:top-16">
              <div className="rounded-lg flex-row flex w-full justify-around text-white">
                <div className="w-[32%] h-[100px] sm:h-auto py-6 px-1 flex flex-col border-b border-gray-100 sm:px-11 sm:py-14 text-center sm:border-0 sm:border-r bg-[#3498DB] rounded-xl sm:min-w-[33%]">
                  <a
                    href=""
                    className="text-sm sm:text-2xl font-bold text-md relative group"
                  >
                    Husband’s Birthday Party
                    <span
                      aria-hidden="true"
                      className="hidden transition-transform transform sm:inline-block ml-4 group-hover:translate-x-1"
                    >
                      &rarr;
                    </span>
                  </a>
                </div>
                <div className="w-[32%] h-[100px] sm:h-auto px-1 py-6 flex flex-col border-b border-gray-100 sm:px-11 sm:py-14 text-center sm:border-0 sm:border-r bg-[#9B59B6] rounded-xl sm:min-w-[33%]">
                  <a
                    href=""
                    className="text-sm sm:text-2xl font-bold text-md relative group"
                  >
                    Wife’s Birthday Party
                    <span
                      aria-hidden="true"
                      className="hidden transition-transform transform sm:inline-block ml-4 group-hover:translate-x-1"
                    >
                      &rarr;
                    </span>
                  </a>
                </div>
                <div className="w-[32%] h-[100px] sm:h-auto py-6 px-1 flex flex-col border-b border-gray-100 sm:px-11 sm:py-14 text-center sm:border-0 sm:border-r bg-[#16A085] rounded-xl sm:min-w-[33%]">
                  <a
                    href=""
                    className="text-sm sm:text-2xl font-bold text-md relative group"
                  >
                    Kid’s Birthday Party
                    <span
                      aria-hidden="true"
                      className="hidden transition-transform transform sm:inline-block ml-4 group-hover:translate-x-1"
                    >
                      &rarr;
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </section>
          {/* Card section */}
          <section className="containerBox w-full card-section mt-20">
            <div className="flex items-center justify-between mb-6">
              <p className="text-xl text-dark font-semibold">
                Top Professionals for Birthday Decorations
              </p>
              <div className="flex">
                <a href="" className="text-primaryColor text-base font-medium">
                  Sort
                </a>
                <button
                  type="button"
                  className="pl-3 text-primaryColor focus:outline-none"
                >
                  <span className="sr-only">Open sidebar</span>
                  <Bars3BottomLeftIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
            </div>
            <div className="text-secondaryColor mb-6 sm:mb-20 flex flex-wrap">
              {paragraphs.slice(0, visibleCount).map((text, index) => (
                <a
                  href=""
                  key={index}
                  className="px-5 py-2 border rounded-lg border-secondaryColor ml-3 mb-3  hover:bg-secondaryColor hover:text-white transition-all delay-50 ease-in"
                >
                  {text}
                </a>
              ))}
              {showMoreButton && (
                <button
                  onClick={toggleContent}
                  className="px-5 py-2 border rounded-lg border-secondaryColor bg-[#C59FD5] ml-3 mb-3"
                >
                  {fullContentVisible ? "Less -" : "More +"}
                </button>
              )}
            </div>
            {/* <div>
              <div className="sm:w-[322px] h-[554px] bg-white rounded-xl"></div>
            </div> */}
            <div className="mx-auto grid max-w-2xl grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-10 sm:gap-y-20 xl:mx-0 xl:max-w-none lg:grid-cols-2 xl:grid-cols-4">
              {posts.map((post) => (
                <article
                  key={post.id}
                  className="flex flex-col items-start justify-between rounded-lg bg-white lg:w-[332px] shadow-xl"
                >
                  <div className="relative w-full">
                    <div
                      className={`faviroute-icon rounded-full w-10 h-10 bg-[#FFF2F5] absolute z-10 mt-7 cursor-pointer text-primaryColor right-5`}
                      onClick={() => toggleFavorite(post.id)}
                    >
                      <svg
                        fill={
                          favorites.includes(post.id)
                            ? "#DE3163"
                            : "transparent"
                        }
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        className="w-6 h-6 relative left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%]"
                      >
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                      </svg>
                    </div>
                    {post.label && (
                      <div
                        className={`category-list rounded-lg px-8 bg-primaryColor absolute z-10 mt-7 cursor-pointer text-white py-1 mx-3`}
                      >
                        {post.label}
                      </div>
                    )}
                    {post.labels && (
                      <div className="flex absolute z-10 mt-7 cursor-pointer">
                        {post.labels.map((label) => (
                          <div
                            key={label}
                            className={`category-list rounded-lg px-5 bg-primaryColor text-white py-1 mx-2 font-bold`}
                          >
                            {label}
                          </div>
                        ))}
                      </div>
                    )}
                    <img
                      src={post.imageUrl}
                      alt=""
                      className="aspect-[16/9] w-full bg-gray-100 rounded-lg rounded-b-none object-cover sm:aspect-[2/1] lg:aspect-[3/2] h-[300px] "
                    />
                    <div className="absolute inset-0  rounded-lg ring-1 ring-inset ring-gray-900/10" />
                  </div>

                  <Link
                    className="max-w-xl w-full hover:bg-userTheme1 cursor-pointer transition-all delay-50 ease-in"
                    href=""
                  >
                    <div className="group relative  pb-6 ">
                      <div className="flex relative pl-5">
                        <h3 className="text-lg mt-6 font-semibold leading-6 text-gray-900 group-hover:text-gray-600 w-[200px]">
                          <a href={post.href}>
                            <span className="absolute inset-0" />
                            {post.title}
                          </a>
                        </h3>
                        {post.price && (
                          <div className="font-bold rounded-es-xl text-white bg-lightTheme py-2 min-w-fit absolute right-0 px-5">
                            {post.price}
                          </div>
                        )}
                      </div>
                      <Link
                        className="relative mt-4 flex items-center gap-x-3 pl-5"
                        href=""
                      >
                        <img
                          src={post.detail.imageUrl}
                          alt=""
                          className="h-7 w-7 rounded-full bg-gray-100 border-2"
                        />
                        <p className="text-[#626262] text-sm">
                          <a href={post.detail.href}>
                            <span className="absolute inset-0" />
                            {post.detail.name}
                          </a>
                        </p>
                      </Link>
                      <div className="mt-3 flex items-center pl-5">
                        <div className="flex items-center">
                          {post.detail.rating && (
                            <>
                              <img
                                src="https://i.ibb.co/gSYSQsY/star-1.png"
                                alt="star-1"
                                border="0"
                                className="w-4 h-4"
                              />
                              <p className="ml-1 text-sm">
                                {post.detail.rating + " "}
                                <span className="text-[#767676]">
                                  {post.detail.ratingConunt}
                                </span>
                              </p>
                            </>
                          )}
                        </div>
                        {post.detail.city && (
                          <div className="ml-3 flex items-center">
                            <img
                              src="https://i.ibb.co/kJVB30y/location.png"
                              alt="location"
                              border="0"
                              className="w-4 h-4"
                            ></img>
                            <p className="font-light text-xs ml-1">
                              {post.detail.city}
                            </p>
                          </div>
                        )}
                      </div>
                      <div className="border-b border-[#E6E6E6] my-5"></div>
                      <p className="text-[#626262] text-sm mb-7 max-w-[300px] pl-5">
                        {post.detail.desc}
                      </p>
                      <div className="pl-5">
                        <Link href="">
                          <button className="text-center border border-primaryColor text-primaryColor hover:bg-primaryColor hover:text-white px-5 py-2 rounded-lg w-[94%] transition-all ease-in delay-50">
                            CONTACT NOW
                          </button>
                        </Link>
                      </div>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          </section>
          <section className="mt-5 mb-5 px-[20px]">
            <p className="pl-[15px] text-xl text-dark font-semibold">
              Mock API section
            </p>
            <div className=" flex justify-between flex-wrap">
              {users.map(
                (user, index) =>
                  user.name && (
                    <div
                      key={index}
                      className={`category-list rounded-lg px-8 bg-primaryColor z-10 mt-7 cursor-pointer py-5 mx-3 w-[300px] h-[300px] text-white flex flex-col gap-4`}
                    >
                      <p>Name : {user.name}</p>
                      <p>
                        Date: {format(new Date(user.createdAt), "yyyy-MM-dd")}
                      </p>
                      <p>Name : {user.city}</p>
                      <p>Price : {user.Price}</p>
                    </div>
                  )
              )}
            </div>
          </section>
          <div className="px-[38px] pb-10">
            <p className="pl-[15px] text-xl text-dark font-semibold my-4">
              Product List
            </p>
            <ul className="flex items-center justify-between flex-wrap ">
              {product.map((product) => (
                <li key={product.id}>
                  <img
                    src={product.category.image}
                    alt={product.title}
                    className="w-[300px] h-[300px]  rounded-lg mb-4 object-cover"
                    onClick={() => openModal(product)}
                  />
                  {/* <h2 className="max-w-[300px]">{product.title}</h2> */}
                  <p>Price: {product.price}</p>
                  <p>
                    creationAt:{" "}
                    {new Date(product.creationAt).toLocaleDateString()}
                  </p>
                  <p>
                    updatedAt:{" "}
                    {new Date(product.updatedAt).toLocaleDateString()}
                  </p>
                  <button
                    className="text-center border border-primaryColor text-primaryColor hover:bg-primaryColor hover:text-white px-5 py-2 mt-5 rounded-lg w-[94%] transition-all ease-in delay-50"
                    onClick={() => openModal(product)}
                  >
                    View Product
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <UserFooter />
        </div>
      </div>
      {isModalOpen && selectedProduct && (
        <div className="fixed inset-0 z-[2000] flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
          <div className="relative w-[600px] max-w-3xl mx-auto my-6">
            {/* Modal content */}
            <div className="relative flex flex-col bg-white shadow-md rounded-lg overflow-hidden">
              <div className="px-6 py-4">
                <h2 className="text-xl font-bold mb-2">
                  {selectedProduct.title}
                </h2>
                <img
                  src={selectedProduct.category.image}
                  alt={selectedProduct.title}
                  className="w-full h-[350px] rounded-lg mb-4 object-cover"
                />
                <p>Price: Rs. {selectedProduct.price}</p>
                <p>
                  CreatedAt:{" "}
                  {new Date(selectedProduct.creationAt).toLocaleDateString()}
                </p>
                <p>
                  UpdatedAt:{" "}
                  {new Date(selectedProduct.updatedAt).toLocaleDateString()}
                </p>
              </div>
              <div className="px-6 py-4 bg-gray-100 border-t border-gray-200 flex justify-end">
                <button
                  onClick={closeModal}
                  className="text-center border border-primaryColor text-primaryColor hover:bg-primaryColor hover:text-white px-2 py-2 mt-5 rounded-lg w-full transition-all ease-in delay-50"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
