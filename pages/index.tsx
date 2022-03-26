import { useEffect, useState } from 'react'
import type { GetServerSideProps, NextPage } from 'next'
import styled from 'styled-components'
// Types
import { ProductType } from '../types/Product'
// Components
import Product from '../components/Product'
import Navbar from '../components/navigation/Navbar'
import Hero from '../components/home/Hero'
import Category from '../components/home/Category'
import { Container, Separator } from '../styles/styles'
import Footer from '../components/navigation/Footer'

const Home: NextPage<{data: ProductType[]}> = ({data}) => {
  const [products, setProducts] = useState<ProductType[]>(data)

  return (
    <div>
      <Navbar/>
      <Hero
        title="MacBook Air up to -50% off"
        text="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusantium blanditiis veritatis, cum repellendus tempore molestiae quas porro? Asperiores similique non nostrum. Corrupti repellat quis placeat odio. Tempora omnis delectus, alias libero iste hic odit unde, repellat voluptatem doloremque architecto saepe dignissimos quae dolor blanditiis cumque fuga corrupti iusto atque! Voluptatem!"
        linkText="Learn more"
        linkUrl="#"
        image="https://i.ya-webdesign.com/images/macbook-air-png-transparent-background-6.png"
      />
      <Categories>
        <Category
          title="Mobile phones"
          text="From flagship phones all the way to budget models."
          imageSrc="https://purepng.com/public/uploads/large/purepng.com-iphone-xiphone-xapplescreen-21530617565atiut.png"
          maxImageWidth="200px"
          maxImageHeight="250px"
          imageRight="-10px"
          category="phone"
        />
        <Category
          title="Tablets"
          text="Tablets of all sizes, budget and specifications."
          imageSrc="http://www.pngall.com/wp-content/uploads/5/Apple-IPad-PNG-File-Download-Free.png"
          maxImageWidth="200px"
          maxImageHeight="300px"
          imageRight="-30px"
          category="tablet"
        />
        <Category
          title="Laptops"
          text="Laptops for gaming, for working and studying."
          imageSrc="https://www.pngarts.com/files/4/Apple-Macbook-Pro-Transparent-Image.png"
          maxImageWidth="230px"
          maxImageHeight="300px"
          imageRight="-50px"
          category="laptop"
        />
      </Categories>
      <CategorySeparator/>
      <Products>
        {products.map(product => (
          <Product
            key={product.id}
            id={product.id}
            name={product.name}
            image={product.image}
            price={product.price}
            category={product.category}
          />
        ))}
      </Products>
      <Footer/>
    </div>
  )
}

export const getServerSideProps:GetServerSideProps = async() => {
  const res = await fetch('http://localhost:3000/api/products');
  const data = await res.json();
  
  return {
    props: {
      data: data
    }
  }
}

const Categories = styled.div`
  max-width: 1400px;
  width: 100%;
  padding: 0 20px;
  display: flex;
  align-items: center;
  margin: 0 auto;
  margin-top: 30px;
  justify-content: space-between;
  @media (max-width: 1076px) {
    h2 {
      font-size: 1.5rem;
    }
    p {
      font-size: .9rem;
    }
    div {
      padding: 15px;
    }
  }
  @media (max-width: 828px){
    flex-direction: column;
    div {
      margin: 10px 0;
    }
  }
`;

const CategorySeparator = styled(Separator)`
  max-width: 1400px;
  margin: 30px auto;
`;

const Products = styled(Container)`
  padding: 20px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  justify-items: center;
  grid-gap: 20px;
  @media (max-width: 976px){
    grid-template-columns: 1fr 1fr 1fr;
  }
  @media (max-width: 850px) {
    grid-template-columns: 1fr 1fr;
  }
  @media (max-width: 668px) {
    grid-template-columns: 1fr;
  }
`;


export default Home
