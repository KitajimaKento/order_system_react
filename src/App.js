import React, { Component } from "react";
import Rect from "./Rect";
import "./test.css";
import "./reset.css";

//仮のデータ
let store_data = {
  //コンテキストに入れるものはもっと多重配列にできるのか。
  store_name: "モスバーガー",
  store_place: "西口11番店舗",
  order1: "ハンバーガー",
  order2: "ポテト",
  total: "220",
  order_time: "12:00:00"
};

//コンテキスト
const data = React.createContext(store_data); //ここを2つに出来ないか。

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false
    };
  }
  componentWillMount() {
    return fetch("https://facebook.github.io/react-native/movies.json")
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          title: responseJson.title,
          movies: responseJson.movies
        });
        console.log(responseJson);
      })
      .catch(error => {
        console.error(error);
      });
  }

  render() {
    const state = this.state;
    if (state.data !== undefined) {
      console.log(state.data);
      console.log(state.data.title);
    }
    return (
      <div>
        <Head />
        <Header />
        <Body value={this.state} />
        <Footer />
      </div>
    );
  }
}

class Head extends Component {
  render() {
    return (
      <div>
        <html lang="ja" />
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta http-equiv="X-UA-Compatible" content="ie=edge" />
        <link
          rel="stylesheet"
          href="/Users/Kento/Desktop/React超入門/chapter/react_app/static/css/test.css"
        />
        <link
          rel="stylesheet"
          href="/Users/Kento/Desktop/React超入門/chapter/react_app/static/css/reset.css"
        />
        {/* <title>UberEats画面</title> */}
      </div>
    );
  }
}

class Header extends Component {
  static contextType = data;

  render() {
    return (
      <header>
        <div>
          <p class="left">
            <a href="#">←</a>
          </p>
          <p>{data.order1}</p>
          <p>{this.context.store_name}</p>
        </div>
      </header>
    );
  }
}

class Body extends Component {
  static contextType = data;

  render() {
    return (
      <div>
        <main>
          <div className="content">
            <section className="store-name">
              <h1>{this.context.store_name}</h1>
              <p>{this.context.store_place}</p>
            </section>

            <section className="map">
              {this.props.value.title}
              <h1>なにか説明</h1>
            </section>

            <section className="detail">
              <div className="detail1">
                <p>● </p>
              </div>
              <div className="detail1">
                <p>● Order Time: {this.context.order_time}</p>
              </div>
            </section>

            <section className="order">
              <div className="your-order">
                <h1>Your order</h1>
                <p>price</p>
              </div>
              <div className="orders">
                <p>①ハンバーガー</p>
                <p>100円</p>
              </div>
              <div className="orders">
                <p>②ポテト</p>
                <p>120円</p>
              </div>
            </section>
          </div>
        </main>
      </div>
    );
  }
}

class Footer extends Component {
  static contextType = data;

  render() {
    const state = this.state;
    console.log(this.state);
    console.log(state);
    return (
      <footer>
        <div>
          <h1>
            <a href="#">確認画面へ</a>
          </h1>
          <p class="right">{this.context.total}円</p>
        </div>
      </footer>
    );
  }
}

export default App;
