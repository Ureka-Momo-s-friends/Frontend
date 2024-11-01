import React, { useEffect, useState } from "react";
import * as S from "./style";
import { SearchIcon } from "assets/svgs";
import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";

const SearchBox = () => {
  const route = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get("keyword") || "";

  const handleSearch = () => {
    if (searchTerm.trim()) {
      route(`/search?keyword=${encodeURIComponent(searchTerm)}`);
    }
  };

  useEffect(() => {
    if (keyword) {
      setSearchTerm(keyword);
    }
  }, [keyword]);

  return (
    <S.Layer>
      <input
        type="text"
        placeholder="찾고 싶은 상품을 검색해 보세요!"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSearch();
          }
        }}
      />
      <S.SearchButton onClick={handleSearch}>
        <SearchIcon />
      </S.SearchButton>
    </S.Layer>
  );
};

export default SearchBox;
