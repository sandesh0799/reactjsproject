import React, { Component } from 'react'
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

import {onFetchCategories} from './../../../Redux/category/CategoryAction';
import {fetchSingleProduct, onUpdateProduct} from './../../../Redux/product/ProductAction';
import { Spinner } from 'reactstrap';
class EditProduct extends Component {
    constructor(props){
        //console.log("Edit Cat");
        super(props);
        const id=this.props.match.params.id;
       // console.log(id);
       this.state={
        id:id,
        name:"",
        price:"",
        categoryId:"",
        description:"",
        image:"",
        quantity:"",
        old_img:"",
       }
        this.getSingleProduct(id);

    }
    componentDidMount(){
        this.props.onFetchCategories();
    }

    getSingleProduct=async(id)=>{
        const res=await this.props.fetchSingleProduct(id);
       console.log(res);
       this.setState({name:res.name, categoryId:res.categoryId, price:res.price, description:res.description, quantity:res.quantity, old_img:res.image});
    }
    onHandleChange=(e)=>{
        this.setState({[e.target.name]:e.target.value});
    }
    onSubmit=()=>{
        let {name, price, image, categoryId, quantity, description, id, old_img}=this.state;
        const obj={
            name,price,image,categoryId,quantity,description,id, old_img
        }
        this.props.onUpdateProduct(obj, this.props.history);
    }
    render() {
        const {name, price, categoryId, description, image, quantity, id, old_img}=this.state;
        const {categories}=this.props;
        const {success, error}=this.props.products;
        //console.log(categories);
        if(this.props.categories.dataState=="FETCHING" || this.props.categories.dataState=="NOT_INITIALIZED"){
            return(
                <div className="text-center">
                    <Spinner color="primary" />
                </div> 
            )
        }else{
        return (
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-6 card p-5">
                    <h1 className="text-center text-info">Edit Product</h1>
                    {success?<p className="text-success">{success}</p>:""}
                    {error?<p className="text-danger">{error}</p>:""}
                    
                    <div className="form-group">
                        <label>Name</label>
                        <input type="text" name="name" value={name} className="form-control" onChange={this.onHandleChange} />
                    </div>
                    <div className="form-group">
                        <label>Category</label>
                        <select value={categoryId} name="categoryId" onChange={this.onHandleChange} className="form-control"> 
                            <option>--select Category--</option>
                            {categories.categories.map((cat, index)=>(
                                <option key={index} value={cat._id}>{cat.categoryName}</option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Price</label>
                        <input type="text" name="price" value={price} className="form-control" onChange={this.onHandleChange} />
                    </div>
                    <div className="form-group">
                        <label>Quantity</label>
                        <input type="text" name="quantity" value={quantity} className="form-control" onChange={this.onHandleChange} />
                    </div>
                    <div className="form-group">
                        <label>Image</label>
                        <input type="file" name="image"  className="form-control-file" onChange={this.onFileChange} />
                    </div>
                    <div className="form-group">
                        <label>Description</label>
                        <textarea rows="5"  name="description" value={description} className="form-control" onChange={this.onHandleChange} />
                    </div>
                    <div className="text-center">
                        <input type="hidden" name="id" value={id}/>
                        <input type="hidden" name="old_img" value={old_img}/>
                        <button className="btn btn-info" onClick={this.onSubmit}>Update Product</button>
                    </div>
                </div>
                </div>
            </div>
        )
 
    }
}
}
const mapStateToProps=state=>({
    categories:state.categories,
    products:state.products,
})
export default connect(mapStateToProps,{fetchSingleProduct, onUpdateProduct, onFetchCategories})(withRouter(EditProduct));