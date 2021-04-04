export function formatBytes(a,b=2){if(0===a)return"0 Bytes";const c=0>b?0:b,d=Math.floor(Math.log(a)/Math.log(1024));return parseFloat((a/Math.pow(1024,d)).toFixed(c))+" "+["Bytes","KB","MB","GB","TB","PB","EB","ZB","YB"][d]}

export const sectionClasses = "text-2xl mb-1 md:mb-2 md:text-3xl font-heading";

let d = new Date();
export const currentYear =  d.getFullYear();
