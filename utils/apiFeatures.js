class APIFeature{
    constructor(query,queryStr){  //using queryString
        this.query = query;
        this.queryStr = queryStr;
    }

    search(){
      let keyword =   this.queryStr.keyword ? {
        name:{
            $regex: this.queryStr.keyword,
            $options:'i'
        }

      }:{};

      this.query.find({...keyword})
      return this;

    }
    
    filter(){
        const queryStrCopy = {...this.queryStr}
       
       
        //removing fields from query
        const removeField = ['keyword','limit','page'];
        removeField.forEach(field=> delete queryStrCopy [field]);

        let queryStr = JSON.stringify(queryStrCopy);
      queryStr =  queryStr.replace(/\b(|gt|gte|lt|lte)/g, match =>`$${match}`)
      console.log( queryStr)
        
        this.query.find(JSON.parse(queryStr));
        
        return this;


    }

    paginate(resPerPage){
        const currentPage = Number(this.queryStr.page)||1;

        const skip = resPerPage * currentPage -1 //skip is used for fetching the data from where to where
        this.query.limit(resPerPage).skip(skip);  //limit used to check how many data 
        return this;

    }


}

module.exports = APIFeature;

