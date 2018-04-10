<template>
	<div class="main">
		<div class="content-head">
			<div @click="changeMsg" class="content-pic">
				<icon v-bind:name="picName" scale="5"></icon>
			</div>
			<span @click="changeMsg">{{titleName}}</span>
    		<app-modal @on-close="changeMsg" @changeConstellation="changeConstellation" :show="msg"  :constellation="constellation"></app-modal>
		</div>
		<ul class="fortune">
			<li v-for="(item,key,index) in data.fortuneList" v-if="index < 4">
				<span class="left">{{key}}</span> 
				<span  v-for="n in 5">
				<icon v-if="n <= item/16" name="starfill" scale="2"></icon>
				<icon v-else name="stargray" scale="2"></icon>
				</span>	
			</li>
			<li v-else>
				<span class="left">{{key}}</span>  
				<span class="right">{{item}}</span>
			</li>
		</ul>
		<div class="content-foot">
			<ul>
				<li v-for="(item,key,index) in data.dateil">
					<h4>{{key}}</h4>
					<span>{{item}}</span>
				</li>
			</ul>
		</div>
	</div>
</template>


<script>
import qs from 'qs'

import AppDialog from './AppDialog'
import storage from '../util/storage'
	export default {
		name:'HomeContent',
		components:{
			"app-modal":AppDialog
		},
		data() {
			return {
				data:"",
				msg:false,
				constellation:'',
				titleName:"",
				picName:"",
				items: storage.fetch()
			}
		},
		methods:{
			changeMsg(event){
				this.msg=!this.msg;
			},
			changeConstellation(data){
				this.constellation = data.pic;
				this.titleName = data.name;
				this.picName = data.pic;
				storage.save(data);
				console.log(storage);
				this.changeMsg();
				this.postData();
			},
			postData(){
				this.$http.post("http://chenguini.top/haha.php",qs.stringify({constellation:this.constellation
					}))
				.then(res=>{
					this.data=res.data;
				}).catch(error=>console.log(error));
			}
		},
		created() {
			if(this.items=="") {
				this.postData();
				this.changeMsg();
			}else{
				this.constellation = this.items.pic;
				this.titleName = this.items.name;
				this.picName = this.items.pic;
				this.postData();
			}
		}
	}
	
</script>

<style scoped>
	.main {
		width: 100%;
		background: #f9f9f9;
		text-align: left;
		line-height: 24px;
		padding-top: 60px;
		padding-bottom: 80px;
	}
	.content-head {
		text-align: center;
		padding-top: 10px;
	}
	.content-pic {
		width: 60px;
		height: 60px;
		background: #9cb9b9;
		border-radius: 30px;
		text-align: center;
		line-height: 90px;
		display:inline-block;
		vertical-align:middle;
	}
	.content-head span {
		display:inline-block;
		font-size: 20px;
		font-weight: bold;
		margin-left: 15px;
	}
	ul {
		clear: both;
	}
	li {
		padding-left: 3%;
	}
	.fortune li {
		width: 47%;
		float: left;
	}
	.left {
		color: #000;
	}
	.right {
		color: #333;
	}
	.content-foot {
		font-size: 16px;
	}
</style>