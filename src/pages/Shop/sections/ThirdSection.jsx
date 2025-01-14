import { useEffect, useState } from 'react';
import useInfiniteSwiper from '../../../hooks/useInfiniteSwiper';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import BestSkeleton from '../../../components/Skeleton/BestSkeleton';

const StyledSection = styled.section`
  h3 {
    font-size: 30px;
    font-weight: 900;
  }

  div.container {
    div.categories {
      margin-top: 30px;
      display: flex;
      gap: 30px;
      color: ${({ theme }) => theme.colors.disabledTitle};
      position: relative;

      h3 {
        cursor: pointer;
        padding-bottom: 20px;
        transition: 0.3s;
        position: relative;

        &::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          height: 6px;
          width: 100%;
          background-color: ${({ theme }) => theme.colors.disabledTitle};
          transition: 0.3s;
          transform: scaleX(0);
          transform-origin: 0;
        }

        &:hover {
          color: black;

          &::after {
            background-color: black;
            transform: scaleX(1);
          }
        }

        &:nth-child(${({ mode }) => mode}) {
          color: black;

          &::after {
            background-color: black;
            transform: scaleX(1);
          }
        }
      }

      ul.navigator {
        position: absolute;
        right: 0;
        bottom: 0;
        display: flex;
        gap: 20px;

        li {
          width: 14px;
          height: 14px;
          background-color: ${({ theme }) => theme.colors.disabledTitle};
          transition: 0.3s;

          &:nth-child(${({ page }) => page}) {
            background-color: black;
          }
        }
      }
    }

    div.section {
      margin-top: 60px;
      display: flex;
      gap: 50px;

      div.imgContainer {
        width: 520px;
        height: 650px;

        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }

      div.listContainer {
        width: calc(100% - 570px);
        overflow: hidden;

        ul.list {
          width: 400%;
          display: flex;
          height: 100%;

          li {
            width: 25%;
            height: 100%;
            display: flex;
            gap: 40px;
            user-select: none;
            cursor: pointer;

            span.number {
              position: absolute;
              top: 0;
              left: 0;
              display: flex;
              align-items: center;
              justify-content: center;
              width: 40px;
              height: 40px;
              background-color: black;
              color: white;
              font-weight: 900;
            }

            img {
              -webkit-user-drag: none;
            }

            div.text {
              padding: 10px;
            }

            h2 {
              font-size: 16px;
            }

            p {
              font-size: 16px;
              font-weight: 900;

              &.sale {
                color: ${({ theme }) => theme.colors.disabledTitle};
                text-decoration: line-through;
                margin-top: 10px;
              }

              &.realPrice {
                margin-top: 10px;
              }
            }

            span.red {
              color: ${({ theme }) => theme.colors.textHover};
              margin-right: 5px;
            }

            div.firstItem {
              width: calc(50% - 20px);
              position: relative;

              div.text {
                padding: 20px 0;
              }

              img {
                width: 100%;
              }
            }

            div.otherItems {
              display: flex;
              flex-direction: column;
              width: calc(50% - 20px);
              height: 650px;
              gap: 20px;

              div.item {
                display: flex;
                height: calc((100% - 75px) / 4);
                position: relative;

                img {
                  height: 100%;
                  aspect-ratio: 1/ 1;
                }
              }
            }
          }
        }
      }
    }
  }
`;

const ThirdSection = () => {
  const [mode, setMode] = useState(1);
  const { swipedTarget, page, setRender } = useInfiniteSwiper(4, true);
  const [loading, setLoading] = useState(true);
  const [performanceList, setPerformanceList] = useState();
  const [originalList, setOriginalList] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    fetch('http://localhost:8000/products?type=SHOES') // localhost:8000/products?type=SHOES
      .then(res => res.json())
      .then(data => {
        setPerformanceList([data.slice(0, 5), data.slice(5, 10)]);
        setOriginalList([data.slice(10, 15), data.slice(15, 20)]);
        setLoading(false);
      });
  }, []);

  return (
    <StyledSection mode={mode} page={page}>
      <div className='container'>
        <h3>BEST</h3>

        <div className='categories'>
          <h3 onClick={() => setMode(1)}>퍼포먼스라인</h3>
          <h3 onClick={() => setMode(2)}>오리지널라인</h3>
          <ul className='navigator'>
            <li />
            <li />
          </ul>
        </div>

        <div className='section'>
          <div className='imgContainer'>
            <img
              src={
                mode === 1 //
                  ? 'https://images.unsplash.com/photo-1624375812928-106472d9ddb9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=655&q=80'
                  : 'https://images.unsplash.com/photo-1517466787929-bc90951d0974?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=686&q=80'
              }
              alt='라인'
            />
          </div>

          {loading && <BestSkeleton />}
          {!loading && (
            <div className='listContainer' ref={setRender}>
              <ul className='list' ref={swipedTarget}>
                {mode === 1
                  ? [performanceList[1], ...performanceList, performanceList[0]].map((perList, i) => (
                      <li key={i}>
                        <div className='firstItem'>
                          <img src={perList[0].main_image} alt='상품 이미지' onClick={() => navigate(`/product/${perList[0].id}`)} />
                          <span className='number'>{Number(perList[0].id)}</span>
                          <div className='text'>
                            <p>{perList[0].keyword}</p>
                            <h2>{perList[0].title}</h2>
                            {perList[0].is_discounted ? (
                              <>
                                <p className='sale'>{perList[0].price}원</p>
                                <p className='realPrice'>
                                  <span className='red'>{perList[0].discount_percent}%</span>
                                  {perList[0].discounted_price}원
                                </p>
                              </>
                            ) : (
                              <>
                                <p className='realPrice'>{perList[0].price}</p>
                              </>
                            )}
                          </div>
                        </div>
                        <div className='otherItems'>
                          {perList.map(
                            (per, idx) =>
                              idx > 0 && (
                                <div className='item' key={per.id}>
                                  <img src={per.main_image} alt='상품 이미지' onClick={() => navigate(`/product/${per.id}`)} />
                                  <span className='number'>{Number(per.id)}</span>
                                  <div className='text'>
                                    <p>{per.keyword}</p>
                                    <h2>{per.title}</h2>
                                    {per.is_discounted ? (
                                      <>
                                        <p className='sale'>{per.price}원</p>
                                        <p className='realPrice'>
                                          <span className='red'>{per.discount_percent}%</span>
                                          {per.discounted_price}원
                                        </p>
                                      </>
                                    ) : (
                                      <>
                                        <p className='realPrice'>{per.price}원</p>
                                      </>
                                    )}
                                  </div>
                                </div>
                              )
                          )}
                        </div>
                      </li>
                    ))
                  : [originalList[1], ...originalList, originalList[0]].map((perList, i) => (
                      <li key={i}>
                        <div className='firstItem'>
                          <img src={perList[0].main_image} alt='상품 이미지' onClick={() => navigate(`/product/${perList[0].id}`)} />
                          <span className='number'>{Number(perList[0].id)}</span>
                          <div className='text'>
                            <p>{perList[0].keyword}</p>
                            <h2>{perList[0].title}</h2>
                            {perList[0].is_discounted ? (
                              <>
                                <p className='sale'>{perList[0].price}원</p>
                                <p className='realPrice'>
                                  <span className='red'>{perList[0].discount_percent}%</span>
                                  {perList[0].discounted_price}원
                                </p>
                              </>
                            ) : (
                              <>
                                <p className='realPrice'>{perList[0].price}</p>
                              </>
                            )}
                          </div>
                        </div>
                        <div className='otherItems'>
                          {perList.map(
                            (per, idx) =>
                              idx > 0 && (
                                <div className='item' key={per.id}>
                                  <img src={per.main_image} alt='상품 이미지' onClick={() => navigate(`/product/${per.id}`)} />
                                  <span className='number'>{Number(per.id)}</span>
                                  <div className='text'>
                                    <p>{per.keyword}</p>
                                    <h2>{per.title}</h2>
                                    {per.is_discounted ? (
                                      <>
                                        <p className='sale'>{per.price}원</p>
                                        <p className='realPrice'>
                                          <span className='red'>{per.discount_percent}%</span>
                                          {perList[0].discounted_price}원
                                        </p>
                                      </>
                                    ) : (
                                      <>
                                        <p className='realPrice'>{per.price}</p>
                                      </>
                                    )}
                                  </div>
                                </div>
                              )
                          )}
                        </div>
                      </li>
                    ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </StyledSection>
  );
};

export default ThirdSection;
