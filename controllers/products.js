const Product=require("../models/products")

const getAllProducts= async (req, res)=>{

    const {company, name, featured, sort, select}=req.query;
    const queryObject={}

    if(company){
        queryObject.company= { $regex:company, $options:"i" };
        console.log(queryObject.company);
    }

    if(featured){
        queryObject.featured=featured;
    }

    if(name){
        queryObject.name = { $regex:name, $options:"i" };
        console.log(queryObject)
    }

    let apiData=Product.find(queryObject);
    

    if(sort){
        let sortFix=sort.split(",").join(" ");
        apiData=apiData.sort(sortFix);
    }

    if(select){
        let selectFix=select.split(",").join(" ");
        apiData=apiData.select(selectFix);
    } 
    
    let page=Number(req.query.page) || 1;
    let limit=Number(req.query.limit) || 8;

    let skip=(page-1)*limit;

    apiData=apiData.skip(skip).limit(limit);

    const Products=await apiData;
    res.status(200).json({Products, nbHits:Products.length  });
};

const getAllProductsTesting= async (req, res)=>{
    console.log(req.query)
    const myData=await Product.find(req.query)
    res.status(200).json({myData, nbHits:myData.length});
    // res.status(200).json({msg:"I am getAllProductsTesting"});
};

module.exports={getAllProducts, getAllProductsTesting};