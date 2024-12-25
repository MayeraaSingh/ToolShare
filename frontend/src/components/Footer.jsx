import { Footer } from 'flowbite-react';
import React from 'react';
import { Link } from 'react-router-dom';
import {BsGithub, BsInstagram, BsLinkedin,} from 'react-icons/bs';

export default function FooterCom() {
  return (
    <Footer container className=' border border-t-8 border-teal-500'>
      <div className='w-full sm:flex sm:justify-between max-w-7xl max-auto'>
                <Footer.Copyright 
                    href='#' 
                    by="ToolShare" 
                    year={new Date().getFullYear()} />
                <div className='flex gap-6 sm:mt-0 mt-4 sm:justify-center '>
                    <Footer.Icon href='#' icon={BsLinkedin} />
                    <Footer.Icon href='https://github.com/MayeraaSingh/ToolShare.git' icon={BsGithub} />
                    <Footer.Icon href='#' icon={BsInstagram} />
                </div>
      </div>
    </Footer>
  )
}
