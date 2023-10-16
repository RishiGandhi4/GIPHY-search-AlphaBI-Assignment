"use client";

import { useState, useEffect } from "react";
import styled from "styled-components";
import Button from "../Components/Button";
import Favourites from "../Components/Favourites";
import Header from "../Components/Header";
import Random from "../Components/Random";
import Search from "../Components/Search";
import Trending from "../Components/Trending";
import { useGlobal } from "../context/global";
import { useTheme } from "../context/themeContext";
import {useRouter} from "next/navigation";

const AppStyled = styled.div`
  min-height: 100vh;
  background-color: ${props => props.theme.colorBg1};

  .fetch-btns{
    display: flex;
    justify-content: center;
    gap: 4rem;
    margin-top: 4rem;
    margin-bottom: 2rem;
  }

  main{
    padding: 2rem 8rem;
    @media screen and (max-width: 1300px){
      padding: 2rem 4rem;
    }
  }
`;


export default function Home() {
  const { randomGiff } = useGlobal();
  const theme = useTheme();

  const navigate = useRouter();

  useEffect(() => {
    if(!localStorage.getItem('user')){
      navigate.push("/login");
    }
  }, [])

  //state
  const [rendered, setRendered] = useState("trending");

  const content = () => {
    switch (rendered) {
      case "trending":
        return <Trending />;
      case "liked":
        return <Favourites rendered={rendered} />;
      case "random":
        return <Random />;
      case "search":
        return <Search />;
      default:
        return <Trending />;
    }
  };

  return (
    <AppStyled theme={theme}>
      <Header setRendered={setRendered} />
      <div className="fetch-btns">
        <Button
          name={"Liked"}
          icon={<i className="fa-solid fa-heart"></i>}
          onClick={() => {
            setRendered("liked");
          }}
        />
        <Button
          name={"Trending Gifs"}
          icon={<i className="fa-solid fa-arrow-trend-up"></i>}
          onClick={() => {
            setRendered("trending");
          }}
        />
        <Button
          name={"Random Gif"}
          icon={<i className="fa-solid fa-shuffle"></i>}
          onClick={() => {
            setRendered("random");
            randomGiff();
          }}
        />
      </div>
      <main>{content()}</main>
    </AppStyled>
  );
}


