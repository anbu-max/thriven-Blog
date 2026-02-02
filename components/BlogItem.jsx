import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const BlogItem = ({ title, description, category, image, id }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      className='w-full bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100 flex flex-col h-full'
    >
      <Link href={`/blogs/${id}`} className="relative h-48 w-full overflow-hidden block">
        <Image 
          src={image} 
          alt={title} 
          fill
          className='object-cover hover:scale-110 transition-transform duration-500'
        />
      </Link>
      
      <div className='p-5 flex flex-col flex-grow'>
        <span className='inline-block py-1 px-3 text-xs font-semibold tracking-wide text-white bg-black rounded-full w-fit mb-3'>
          {category}
        </span>
        
        <h5 className='mb-3 text-xl font-bold tracking-tight text-gray-900 leading-tight line-clamp-2'>
          {title}
        </h5>
        
        <p className='mb-4 text-sm text-gray-600 line-clamp-3'>
          {description.replace(/<[^>]*>?/gm, '')}
        </p>
        
        <div className="mt-auto">
          <Link 
            href={`/blogs/${id}`} 
            className='inline-flex items-center text-sm font-semibold text-black hover:text-gray-600 transition-colors group'
          >
            Read More 
            <ArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </motion.div>
  )
}

export default BlogItem;