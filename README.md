# BookDB

[홈페이지](https://bookdb.netlify.app/)
<br />

---

## Reason

#### **왜 시작됐는가?**

<p>북디비의 시작은 다양한 책들을 간단하게 리뷰할 수 있는 사이트가 있었으면 좋겠다는 생각에서부터 시작했습니다.</p>

#### **무엇을 하는 사이트인가?**

<p>북디비는 실제 교보문고에 있는  베스트셀러들을 손쉽게 조회할 수 있고, 네이버 검색을 활용해 원하는 책들을 검색할 수 있습니다.
</p>
<p>그리고 본인이 읽었던 책을 골라 블로그와 같은 형식으로 리뷰할 수 있습니다.</p>
<br />

## Stack

#### **북디비는 다음과 같은 스택으로 구성되었습니다.**

<p>1.서버사이드렌더링 및 검색 엔진 최적화를 경험하기 위한 <strong>Next.js</strong> </p>

<p>2.타입의 안정성 확보 및 유지 보수를 위한 <strong>Typescript</strong></p>

<p>3.중앙 상태 관리를 위한 <strong>Redux/Redux-Saga</strong></p>

<p>4.서버사이드렌더링을 지원하는 스타일 <strong>Emotion</strong></p>

<p>5.서버 구축을 위한 Node.JS의 <strong>Express</strong></p>

<p>6.빠른 배포를 위한 <strong>heroku&netlify</strong></p>

<br />

## Feature

<ul>
<li><a href="#crawling"> 크롤링</a></li>
<li><a href="#search">실시간 검색 </a></li>
<li><a href="#rating">별점 평가 </a></li>
<li><a href="#scroll">인피니트 스크롤 </a></li>
<li><a href="#text">위지위그 에디터 </a></li>
</ul>

<br />
<br />

### <a style="color: black" id="crawling"> 크롤링</a>

<br />

<p>북디비에서는 교보문고에서 크롤링한 최신 작가 인터뷰, 스테디셀러, 주간&월간&년간 베스트 셀러를 제공합니다.</p>
<p>데이터는 Node를 활용해 크롤링했으며 모듈은 cheerio, iconv-ite를 사용했습니다.</p>
<br />
<img src="./images/bestseller.png"  style="width: 500px" alt="크롤링한사진" /> <br />
<img src="./images/steady.png" style="width: 500px"  alt="크롤링한사진" />
</p>

<br />

### <a style="color: black" id="search">실시간 검색 </a>

<br />
<p>네이버 검색 API를 사용해, 책을 검색할 수 있습니다.<br />
검색창에 검색어를 입력할 시, 실시간으로 검색 목록이 나타납니다.</p>
<br />
<img src="./images/search.gif" style="width: 500px"  alt="크롤링한사진" />
<br />

### <a style="color: black" id="scroll">인피니트 스크롤 </a>

<br />
<p>유저 경험을 고려해 인피니트 스크롤을 구현하여 페이지를 넘기지 않아도 컨텐츠를 볼 수 있도록 하였습니다.<br /> 
scroll 이벤트를 활용하던 기존의 방식 대신, 보다 효율적으로 구현하기 위해 IntersectionObserver API를 활용했습니다.
</p>

<br />

<img src="./images/scroll.gif" style="width: 500px"  alt="크롤링한사진" />
<br />

### <a style="color: black" id="rating">별점 평가 </a>

<br />
<p>책 리뷰를 위해 별점 평가를 사용할 수 있는 별점 평가 기능을 구현했습니다.</p>
<img src="./images/rating.gif" style="width: 500px"  alt="크롤링한사진" />
<br />

### <a style="color: black" id="text">위지위그 에디터 </a>

<br />
<p>quill에디터를 도입하여 이미지 업로드, 글자 크기, 글꼴의 변경 등 보다 상세한 글쓰기 기능을 구현 했습니다.<br />
</p>
<img src="./images/text.gif" style="width: 500px"  alt="크롤링한사진" />
<br />
