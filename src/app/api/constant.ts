'use client'
import axios from 'axios';
 
   export const axiosPublic = axios.create({
        baseURL: "https://stu.globalknowledgetech.com:8444",
        headers: {
          "Content-Type": "application/json",

        },
      });