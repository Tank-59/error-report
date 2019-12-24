import * as React from 'react'

class ErrorTest extends React.Component{
  constructor(props){
    super(props);
    this.state={

    }
  }
  componentDidMount(){}

  test=()=>{
    console.log('oops!!');

    this.throwErrTest();
    // this.scriptErr();
    // this.imgError();
    // this.promiseErr();
  };
  throwErrTest () {
    throw new Error('my throw error test');
  }
  scriptErr () {
    const scriptEle = document.createElement('script');
    scriptEle.src = 'https://www.baidu.com/666.js';
    document.appendChild(scriptEle);
  }
  promiseErr () {
    Promise.reject('promise error ooooo');
    return new Promise((resolve, reject) => {
      reject('promise error ooh!!')
    })
  }
  imgError () {
    const img = document.createElement('img');
    img.src = 'https://www.baidu.com/test.jpg';
    document.appendChild(img);
  }

  render() {
    return (
      <div onClick={this.test}
           style={{
             height:60,
             lineHeight: '30px',
             textAlign: 'center',
             background: 'orangered'
           }}>
        <h2>REACT Error Testing ...</h2>
        <p>oops!</p>
      </div>
    )
  }
}

export default ErrorTest
