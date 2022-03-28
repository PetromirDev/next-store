import { useState } from 'react'
import type { GetServerSideProps, NextPage } from 'next'
import styled from 'styled-components'
// Components
import Product from '../components/Product'
import Navbar from '../components/navigation/Navbar'
import Hero from '../components/home/Hero'
import Category from '../components/home/Category'
import { Container, Separator } from '../styles/styles'
import Footer from '../components/navigation/Footer'
// Types
import { ProductType } from '../types/Product'

const categories = [
  {
    title: "Mobile phones",
    text: "From flagship phones all the way to budget models.",
    category: "phone"
  },
  {
    title: "Tablets",
    text: "Tablets of all sizes, budget and specifications.",
    category: "tablet"
  },
  {
    title: "Laptops",
    text: "The ultimate in portable computing.",
    category: "laptop"
  }
];

const Home: NextPage<{data: ProductType[]}> = ({data}) => {
  const [products, setProducts] = useState<ProductType[]>(data)
  
  return (
    <div>
      <Navbar/>
      <Hero
        title="MacBook Air up to -50% off"
        text="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusantium blanditiis veritatis, cum repellendus tempore molestiae quas porro? Asperiores similique non nostrum. Corrupti repellat quis placeat odio. Tempora omnis delectus, alias libero iste hic odit unde, repellat voluptatem doloremque architecto saepe dignissimos quae dolor blanditiis cumque fuga corrupti iusto atque! Voluptatem!"
        linkText="Learn more"
        linkUrl="/product/1"
        image="https://i.ya-webdesign.com/images/macbook-air-png-transparent-background-6.png"
      />
      <Categories>
        {categories.map(category => (
          <Category
            key={category.category}
            title={category.title}
            text={category.text}
            category={category.category}
          />
        ))}
      </Categories>
      <CategorySeparator className="bg-secondary"/>
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
  const res = await fetch('https://next-store-fqtnyzi3g-pgameplay.vercel.app/api/products');
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
