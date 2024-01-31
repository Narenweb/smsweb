import React from "react";
import Slider from "react-slick";
import { useMediaQuery } from "react-responsive";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Testimonials = () => {
  const isMobile = useMediaQuery({ maxWidth: 767 }); // Adjust the breakpoint as needed

  // Slider settings for desktop
  const desktopSliderSettings = {
    slidesToShow: 2,
    slidesToScroll: 2,
    dots: true,
    infinite: true,
    speed: 900,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    // Add other settings as needed
  };

  // Slider settings for mobile
  const mobileSliderSettings = {
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    // Add other settings as needed
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
  };

  return (
    <>
      {/* <section className="containerBox sm:py-20 mt-20 md:mt-auto">
        <h2 className="text-center text-[32px] font-bold mb-14 px-1">
          What Our Customers Are Saying
        </h2>
        <div className="mx-auto max-w-[87rem] px-6 lg:px-8 bg-white py-10 md:py-20">
          <Slider {...settings}>
            <div>
              <div className="mx-auto grid max-w-2xl grid-cols-1 lg:mx-0 lg:max-w-none lg:grid-cols-2 px-5">
                <div className="flex flex-col pb-10 sm:pb-16 lg:pb-0 lg:pr-8 xl:pr-20">
                  <figure className="flex flex-auto flex-col justify-between">
                    <blockquote className="text-lg leading-8 text-gray-900">
                      <p className="text-[#626262]">
                        “Amet amet eget scelerisque tellus sit neque faucibus
                        non eleifend. Integer eu praesent at a. Ornare arcu
                        gravida natoque erat et cursus tortor consequat at.
                        Vulputate gravida sociis enim nullam ultricies habitant
                        malesuada lorem ac. Tincidunt urna dui pellentesque
                        sagittis.”
                      </p>
                    </blockquote>
                    <figcaption className="mt-10 flex items-center gap-x-6">
                      <img
                        className="h-14 w-14 rounded-full bg-gray-50"
                        src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        alt=""
                      />
                      <div className="text-base">
                        <div className="font-semibold text-primaryColor">
                          Judith Black
                        </div>
                        <div className="mt-1">CEO of Tuple</div>
                      </div>
                    </figcaption>
                  </figure>
                </div>
                <div className="flex flex-col border-t border-gray-900/10 pt-10 sm:pt-16 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0 xl:pl-20">
                  <figure className="flex flex-auto flex-col justify-between">
                    <blockquote className="text-lg leading-8 text-gray-900">
                      <p className="text-[#626262]">
                        “Excepteur veniam labore ullamco eiusmod. Pariatur
                        consequat proident duis dolore nulla veniam
                        reprehenderit nisi officia voluptate incididunt
                        exercitation exercitation elit. Nostrud veniam sint
                        dolor nisi ullamco.”
                      </p>
                    </blockquote>
                    <figcaption className="mt-10 flex items-center gap-x-6">
                      <img
                        className="h-14 w-14 rounded-full bg-gray-50"
                        src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        alt=""
                      />
                      <div className="text-base">
                        <div className="font-semibold text-primaryColor">
                          Joseph Rodriguez
                        </div>
                        <div className="mt-1">CEO of Reform</div>
                      </div>
                    </figcaption>
                  </figure>
                </div>
              </div>
            </div>

            <div>
              <div className="mx-auto grid max-w-2xl grid-cols-1 lg:mx-0 lg:max-w-none lg:grid-cols-2 px-5">
                <div className="flex flex-col pb-10 sm:pb-16 lg:pb-0 lg:pr-8 xl:pr-20">
                  <figure className="flex flex-auto flex-col justify-between">
                    <blockquote className="text-lg leading-8 text-gray-900">
                      <p className="text-[#626262]">
                        “Amet amet eget scelerisque tellus sit neque faucibus
                        non eleifend. Integer eu praesent at a. Ornare arcu
                        gravida natoque erat et cursus tortor consequat at.
                        Vulputate gravida sociis enim nullam ultricies habitant
                        malesuada lorem ac. Tincidunt urna dui pellentesque
                        sagittis.”
                      </p>
                    </blockquote>
                    <figcaption className="mt-10 flex items-center gap-x-6">
                      <img
                        className="h-14 w-14 rounded-full bg-gray-50"
                        src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        alt=""
                      />
                      <div className="text-base">
                        <div className="font-semibold text-primaryColor">
                          Judith Black
                        </div>
                        <div className="mt-1">CEO of Tuple</div>
                      </div>
                    </figcaption>
                  </figure>
                </div>
                <div className="flex flex-col border-t border-gray-900/10 pt-10 sm:pt-16 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0 xl:pl-20">
                  <figure className="flex flex-auto flex-col justify-between">
                    <blockquote className="text-lg leading-8 text-gray-900">
                      <p className="text-[#626262]">
                        “Excepteur veniam labore ullamco eiusmod. Pariatur
                        consequat proident duis dolore nulla veniam
                        reprehenderit nisi officia voluptate incididunt
                        exercitation exercitation elit. Nostrud veniam sint
                        dolor nisi ullamco.”
                      </p>
                    </blockquote>
                    <figcaption className="mt-10 flex items-center gap-x-6">
                      <img
                        className="h-14 w-14 rounded-full bg-gray-50"
                        src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        alt=""
                      />
                      <div className="text-base">
                        <div className="font-semibold text-primaryColor">
                          Joseph Rodriguez
                        </div>
                        <div className="mt-1">CEO of Reform</div>
                      </div>
                    </figcaption>
                  </figure>
                </div>
              </div>
            </div>

            <div>
              <div className="mx-auto grid max-w-2xl grid-cols-1 lg:mx-0 lg:max-w-none lg:grid-cols-2 px-5">
                <div className="flex flex-col pb-10 sm:pb-16 lg:pb-0 lg:pr-8 xl:pr-20">
                  <figure className="flex flex-auto flex-col justify-between">
                    <blockquote className="text-lg leading-8 text-gray-900">
                      <p className="text-[#626262]">
                        “Amet amet eget scelerisque tellus sit neque faucibus
                        non eleifend. Integer eu praesent at a. Ornare arcu
                        gravida natoque erat et cursus tortor consequat at.
                        Vulputate gravida sociis enim nullam ultricies habitant
                        malesuada lorem ac. Tincidunt urna dui pellentesque
                        sagittis.”
                      </p>
                    </blockquote>
                    <figcaption className="mt-10 flex items-center gap-x-6">
                      <img
                        className="h-14 w-14 rounded-full bg-gray-50"
                        src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        alt=""
                      />
                      <div className="text-base">
                        <div className="font-semibold text-primaryColor">
                          Judith Black
                        </div>
                        <div className="mt-1">CEO of Tuple</div>
                      </div>
                    </figcaption>
                  </figure>
                </div>
                <div className="flex flex-col border-t border-gray-900/10 pt-10 sm:pt-16 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0 xl:pl-20">
                  <figure className="flex flex-auto flex-col justify-between">
                    <blockquote className="text-lg leading-8 text-gray-900">
                      <p className="text-[#626262]">
                        “Excepteur veniam labore ullamco eiusmod. Pariatur
                        consequat proident duis dolore nulla veniam
                        reprehenderit nisi officia voluptate incididunt
                        exercitation exercitation elit. Nostrud veniam sint
                        dolor nisi ullamco.”
                      </p>
                    </blockquote>
                    <figcaption className="mt-10 flex items-center gap-x-6">
                      <img
                        className="h-14 w-14 rounded-full bg-gray-50"
                        src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        alt=""
                      />
                      <div className="text-base">
                        <div className="font-semibold text-primaryColor">
                          Joseph Rodriguez
                        </div>
                        <div className="mt-1">CEO of Reform</div>
                      </div>
                    </figcaption>
                  </figure>
                </div>
              </div>
            </div>
          </Slider>
        </div>
      </section> */}

      {/* Responsiveness card*/}
      <section className="containerBox sm:py-20 mt-20 md:mt-auto mb-40">
        <h2 className="text-center text-[32px] font-bold mb-14 px-1">
          What Our Customers Are Saying responsiveness
        </h2>
        <div className="mx-auto max-w-[87rem] px-6 lg:px-8 bg-white py-6 md:py-20">
          <Slider
            {...(isMobile ? mobileSliderSettings : desktopSliderSettings)}
          >
            {/* Carousel one */}
            <div>
              <div className="flex flex-col pb-10 sm:pb-16 lg:pb-0 lg:pr-8 xl:pr-20">
                <figure className="flex flex-auto flex-col justify-between">
                  <blockquote className="text-lg leading-8 text-gray-900">
                    <p className="text-[#626262]">
                      “Amet amet eget scelerisque tellus sit neque faucibus non
                      eleifend. Integer eu praesent at a. Ornare arcu gravida
                      natoque erat et cursus tortor consequat at. Vulputate
                      gravida sociis enim nullam ultricies habitant malesuada
                      lorem ac. Tincidunt urna dui pellentesque sagittis.”
                    </p>
                  </blockquote>
                  <figcaption className="mt-10 flex items-center gap-x-6">
                    <img
                      className="h-14 w-14 rounded-full bg-gray-50"
                      src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      alt=""
                    />
                    <div className="text-base">
                      <div className="font-semibold text-primaryColor">
                        Judith Black
                      </div>
                      <div className="mt-1">CEO of Tuple</div>
                    </div>
                  </figcaption>
                </figure>
              </div>
            </div>
            <div className="flex flex-col  lg:border-gray-900/10 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0 xl:pl-20">
              <figure className="flex flex-auto flex-col justify-between">
                <blockquote className="text-lg leading-8 text-gray-900">
                  <p className="text-[#626262]">
                    “Excepteur veniam labore ullamco eiusmod. Pariatur consequat
                    proident duis dolore nulla veniam reprehenderit nisi officia
                    voluptate incididunt exercitation exercitation elit. Nostrud
                    veniam sint dolor nisi ullamco.”
                  </p>
                </blockquote>
                <figcaption className="mt-10 flex items-center gap-x-6">
                  <img
                    className="h-14 w-14 rounded-full bg-gray-50"
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt=""
                  />
                  <div className="text-base">
                    <div className="font-semibold text-primaryColor">
                      Joseph Rodriguez
                    </div>
                    <div className="mt-1">CEO of Reform</div>
                  </div>
                </figcaption>
              </figure>
            </div>
            {/* Carousel two */}
            <div>
              <div className="flex flex-col pb-10 sm:pb-16 lg:pb-0 lg:pr-8 xl:pr-20">
                <figure className="flex flex-auto flex-col justify-between">
                  <blockquote className="text-lg leading-8 text-gray-900">
                    <p className="text-[#626262]">
                      “Amet amet eget scelerisque tellus sit neque faucibus non
                      eleifend. Integer eu praesent at a. Ornare arcu gravida
                      natoque erat et cursus tortor consequat at. Vulputate
                      gravida sociis enim nullam ultricies habitant malesuada
                      lorem ac. Tincidunt urna dui pellentesque sagittis.”
                    </p>
                  </blockquote>
                  <figcaption className="mt-10 flex items-center gap-x-6">
                    <img
                      className="h-14 w-14 rounded-full bg-gray-50"
                      src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      alt=""
                    />
                    <div className="text-base">
                      <div className="font-semibold text-primaryColor">
                        Judith Black
                      </div>
                      <div className="mt-1">CEO of Tuple</div>
                    </div>
                  </figcaption>
                </figure>
              </div>
            </div>
            <div className="flex flex-col  lg:border-gray-900/10 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0 xl:pl-20">
              <figure className="flex flex-auto flex-col justify-between">
                <blockquote className="text-lg leading-8 text-gray-900">
                  <p className="text-[#626262]">
                    “Excepteur veniam labore ullamco eiusmod. Pariatur consequat
                    proident duis dolore nulla veniam reprehenderit nisi officia
                    voluptate incididunt exercitation exercitation elit. Nostrud
                    veniam sint dolor nisi ullamco.”
                  </p>
                </blockquote>
                <figcaption className="mt-10 flex items-center gap-x-6">
                  <img
                    className="h-14 w-14 rounded-full bg-gray-50"
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt=""
                  />
                  <div className="text-base">
                    <div className="font-semibold text-primaryColor">
                      Joseph Rodriguez
                    </div>
                    <div className="mt-1">CEO of Reform</div>
                  </div>
                </figcaption>
              </figure>
            </div>
            {/* Carousel Three */}
            <div>
              <div className="flex flex-col pb-10 sm:pb-16 lg:pb-0 lg:pr-8 xl:pr-20">
                <figure className="flex flex-auto flex-col justify-between">
                  <blockquote className="text-lg leading-8 text-gray-900">
                    <p className="text-[#626262]">
                      “Amet amet eget scelerisque tellus sit neque faucibus non
                      eleifend. Integer eu praesent at a. Ornare arcu gravida
                      natoque erat et cursus tortor consequat at. Vulputate
                      gravida sociis enim nullam ultricies habitant malesuada
                      lorem ac. Tincidunt urna dui pellentesque sagittis.”
                    </p>
                  </blockquote>
                  <figcaption className="mt-10 flex items-center gap-x-6">
                    <img
                      className="h-14 w-14 rounded-full bg-gray-50"
                      src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      alt=""
                    />
                    <div className="text-base">
                      <div className="font-semibold text-primaryColor">
                        Judith Black
                      </div>
                      <div className="mt-1">CEO of Tuple</div>
                    </div>
                  </figcaption>
                </figure>
              </div>
            </div>
            <div className="flex flex-col  lg:border-gray-900/10 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0 xl:pl-20">
              <figure className="flex flex-auto flex-col justify-between">
                <blockquote className="text-lg leading-8 text-gray-900">
                  <p className="text-[#626262]">
                    “Excepteur veniam labore ullamco eiusmod. Pariatur consequat
                    proident duis dolore nulla veniam reprehenderit nisi officia
                    voluptate incididunt exercitation exercitation elit. Nostrud
                    veniam sint dolor nisi ullamco.”
                  </p>
                </blockquote>
                <figcaption className="mt-10 flex items-center gap-x-6">
                  <img
                    className="h-14 w-14 rounded-full bg-gray-50"
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt=""
                  />
                  <div className="text-base">
                    <div className="font-semibold text-primaryColor">
                      Joseph Rodriguez
                    </div>
                    <div className="mt-1">CEO of Reform</div>
                  </div>
                </figcaption>
              </figure>
            </div>
            {/* Carousel Foure */}
            <div>
              <div className="flex flex-col pb-10 sm:pb-16 lg:pb-0 lg:pr-8 xl:pr-20">
                <figure className="flex flex-auto flex-col justify-between">
                  <blockquote className="text-lg leading-8 text-gray-900">
                    <p className="text-[#626262]">
                      “Amet amet eget scelerisque tellus sit neque faucibus non
                      eleifend. Integer eu praesent at a. Ornare arcu gravida
                      natoque erat et cursus tortor consequat at. Vulputate
                      gravida sociis enim nullam ultricies habitant malesuada
                      lorem ac. Tincidunt urna dui pellentesque sagittis.”
                    </p>
                  </blockquote>
                  <figcaption className="mt-10 flex items-center gap-x-6">
                    <img
                      className="h-14 w-14 rounded-full bg-gray-50"
                      src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      alt=""
                    />
                    <div className="text-base">
                      <div className="font-semibold text-primaryColor">
                        Judith Black
                      </div>
                      <div className="mt-1">CEO of Tuple</div>
                    </div>
                  </figcaption>
                </figure>
              </div>
            </div>
            <div className="flex flex-col  lg:border-gray-900/10 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0 xl:pl-20">
              <figure className="flex flex-auto flex-col justify-between">
                <blockquote className="text-lg leading-8 text-gray-900">
                  <p className="text-[#626262]">
                    “Excepteur veniam labore ullamco eiusmod. Pariatur consequat
                    proident duis dolore nulla veniam reprehenderit nisi officia
                    voluptate incididunt exercitation exercitation elit. Nostrud
                    veniam sint dolor nisi ullamco.”
                  </p>
                </blockquote>
                <figcaption className="mt-10 flex items-center gap-x-6">
                  <img
                    className="h-14 w-14 rounded-full bg-gray-50"
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt=""
                  />
                  <div className="text-base">
                    <div className="font-semibold text-primaryColor">
                      Joseph Rodriguez
                    </div>
                    <div className="mt-1">CEO of Reform</div>
                  </div>
                </figcaption>
              </figure>
            </div>
          </Slider>
        </div>
      </section>
    </>
  );
};

export default Testimonials;
