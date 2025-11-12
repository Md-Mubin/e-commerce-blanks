import { Layout, SectionLayout } from '@/components'
import BrandsComponent from '@/components/Brands/BrandsComponent'
import Container from '@/components/reusables/Container'
import React from 'react'

const page = () => {
  return (
    <Layout>
      <Container>
        <SectionLayout>
          <BrandsComponent />
        </SectionLayout>
      </Container>
    </Layout>
  )
}

export default page