
import React, { useState } from 'react'
import Animated from '../components/Animated'
import { dishes } from '../data/data'
import { motion } from 'motion/react'

const Dishes = () => {
  const [rotate, setRotate] = useState({})

  const handleRotate = (index) => {
    setRotate((prev) => ({
      ...prev,
      [index]: (prev[index] || 0) + 360,
    }))
  }

  return (
    <section id="dishes" className="mt-32 px-4 md:mt-44 md:px-6">
      {/* Section heading */}
      <div className="mb-16 text-center">
        <Animated delay={0.2}>
          <p className="mb-3.5 font-medium uppercase text-orange-500">
            Chef's Signature Selection
          </p>
        </Animated>

        <Animated>
          <h2 className="mx-auto mt-3 max-w-lg text-balance text-4xl md:text-5xl">
            Discover Our Signature Dishes
          </h2>
        </Animated>
      </div>

      {/* Dishes grid */}
      <div className="mx-auto mt-20 grid max-w-5xl grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-4 md:gap-x-12">
        {dishes.map((dish, index) => (
          <Animated key={dish.title} y={80} delay={index * 0.1}>
            <div className="flex cursor-pointer flex-col items-center text-center">
              {/* Image rotation animation */}
              <motion.div
                className="flex items-center justify-center"
                animate={{ rotate: rotate[index] || 0 }}
                whileHover={{ scale: 1.08 }}
                transition={{
                  rotate: {
                    type: 'spring',
                    stiffness: 80,
                    damping: 15,
                  },
                  scale: {
                    duration: 0.25,
                  },
                }}
                onMouseEnter={() => handleRotate(index)}
                onFocus={() => handleRotate(index)}
                tabIndex={0}
                role="button"
                aria-label={`Animate ${dish.title} image`}
              >
                <img
                  src={dish.img}
                  alt={dish.title}
                  loading="lazy"
                  className="size-30 object-cover md:size-35"
                />
              </motion.div>

              <h3 className="mt-5 text-lg font-medium">
                {dish.title}
              </h3>

              <p className="mt-2 text-zinc-600">
                {dish.price}
              </p>
            </div>
          </Animated>
        ))}
      </div>
    </section>
  )
}

export default Dishes
