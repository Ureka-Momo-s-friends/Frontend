import React from "react";
import Layout from "components/Layout";
import Search from "components/Product/Search";
import SearchBox from "components/Main/SearchBox";

function ProductSearchPage() {
  return (
    <Layout>
      <SearchBox />
      <Search />
    </Layout>
  );
}

export default ProductSearchPage;
