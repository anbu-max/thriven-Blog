import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { ArrowRight } from 'lucide-react';

const BlogItem = ({ title, description, category, image, id, date }) => {
    return (
        <div className='group flex flex-col'>
            <Link href={`/blogs/${id}`} className='relative aspect-square overflow-hidden mb-6 border border-gray-100 bg-gray-50 rounded-lg'>
                <img 
                    src={image} 
                    alt={title} 
                    className='absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-all duration-700' 
                />
                <span className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 text-[8px] font-bold uppercase tracking-[0.2em] text-black">
                    {category}
                </span>
            </Link>
            
            <Link href={`/blogs/${id}`}>
                <h5 className='mb-3 text-lg font-bold tracking-tight text-black leading-tight uppercase group-hover:underline decoration-1 underline-offset-4 transition-all'>
                    {title}
                </h5>
            </Link>

            <p className='mb-6 text-[11px] font-medium text-black leading-relaxed line-clamp-2'>
                {description.replace(/<[^>]*>?/gm, '')}
            </p>

            <Link href={`/blogs/${id}`} className='w-fit text-[9px] font-bold uppercase tracking-[0.3em] text-black border-b border-gray-100 pb-1 hover:border-black transition-all'>
                Read
            </Link>
        </div>
    );
};

export default BlogItem;