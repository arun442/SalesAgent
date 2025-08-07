'use client'
import axios from 'axios';
 
   export const axiosPublic = axios.create({
        baseURL: "http://stu.globalknowledgetech.com:4005/",
        headers: {
          "Content-Type": "application/json",

        },
      });