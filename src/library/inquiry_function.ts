class inquiryFunction {
    async getDataLength(one : string) {
        const url = "https://www.detik.com";
        const response = await fetch(url);
        const data = await response.text();
        // console.log("inquiry1")
        let total = data.length;
        // let total = 12314125;
        // console.log("inquiry2")
        const t = one.length;
        // console.log("inquiry250")
        total += t;
        // alert(total);
        // console.log("inquiry3")
        return total.toString();
    }
}

const v = new inquiryFunction();
export default v;