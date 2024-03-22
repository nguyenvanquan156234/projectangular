export interface signUp{
  name:string,
  email:string,
  password:string
}
export interface login{
  email:string,
  password:string
}
export interface product{
  name:string,
  price:number,
  category:string,
  color:string,
  image:string,
  description:string,
  id:string,
  quantity:number | undefined,
  productId:string | undefined
}
export interface cart{
  name:string,
  price:number,
  category:string,
  color:string,
  image:string,
  description:string,
  id:string | undefined,
  quantity:number | undefined,
  productId :string,
  userId: string
}
export interface order{
  email:string,
  diachi:string,
  thongtin:string,
  total:number,
  userId:string,
  
}
