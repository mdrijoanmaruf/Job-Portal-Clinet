import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiSearch, FiMapPin, FiBriefcase } from 'react-icons/fi';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

const Hero = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [location, setLocation] = useState('');
  const [category, setCategory] = useState('');
  const [heroSlides, setHeroSlides] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('/herosliders.json')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setHeroSlides(data);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error fetching hero slides:', error);
        setIsLoading(false);
      });
  }, []);

  const jobCategories = [
    "Technology",
    "Marketing",
    "Design",
    "Finance",
    "Healthcare",
    "Education",
    "Engineering",
    "Customer Service"
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    console.log({ searchTerm, location, category });
  };

  return (
    <div className="relative">
      {isLoading ? (
        <div className="h-[600px] md:h-[650px] lg:h-[700px] flex items-center justify-center bg-gradient-to-r from-[#006A71]/10 to-gray-100/50">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-[#006A71] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-[#006A71] font-medium">Loading slider content...</p>
          </div>
        </div>
      ) : (
        <Swiper
          modules={[Autoplay, Pagination, EffectFade]}
          effect="fade"
          pagination={{
            clickable: true,
            dynamicBullets: true,
          }}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          loop={true}
          className="h-[600px] md:h-[650px] lg:h-[700px]"
        >
          {heroSlides.map((slide) => (
            <SwiperSlide key={slide.id}>
              <div className="relative h-full w-full">
                {/* Full-width background image */}
                <div className="absolute inset-0 w-full">
                  <img 
                    src={slide.image} 
                    alt={slide.title} 
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-[#006A71]/90 to-black/50" />
                </div>

                {/* Content container with max-w-7xl */}
                <div className="relative h-full flex items-center z-10">
                  <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-3xl text-white">
                      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 animate-fadeIn">
                        {slide.title}
                      </h1>
                      <p className="text-xl md:text-2xl mb-8 text-white/90 animate-fadeIn animation-delay-200">
                        {slide.subtitle}
                      </p>
                      <Link 
                        to="/jobs" 
                        className="inline-block px-8 py-3 bg-white text-[#006A71] font-medium rounded-md hover:bg-gray-100 transition duration-300 shadow-lg animate-fadeIn animation-delay-400"
                      >
                        {slide.cta}
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}

      <div className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-left">
              <p className="text-3xl md:text-4xl font-bold text-[#006A71] mb-2">10K+</p>
              <p className="text-gray-600">Job Listings</p>
            </div>
            <div className="text-left">
              <p className="text-3xl md:text-4xl font-bold text-[#006A71] mb-2">5K+</p>
              <p className="text-gray-600">Companies</p>
            </div>
            <div className="text-left">
              <p className="text-3xl md:text-4xl font-bold text-[#006A71] mb-2">8K+</p>
              <p className="text-gray-600">Successful Hires</p>
            </div>
            <div className="text-left">
              <p className="text-3xl md:text-4xl font-bold text-[#006A71] mb-2">15K+</p>
              <p className="text-gray-600">Active Users</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;