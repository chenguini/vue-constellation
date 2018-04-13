<template>
	<div class="main">
		<div class="scrollNav">
			<span v-for="(item,index) in selectDay" @click="changeDay(index)" v-bind:class="{active:isActive==index}">
				{{item.name}}
			</span>
		</div>
		<div class="content-head">
			<div @click="changeMsg" class="content-pic">
				<icon v-bind:name="picName" scale="4"></icon>
			</div>
			<span @click="changeMsg">{{titleName}}</span>
    		<app-modal @on-close="changeMsg" @changeConstellation="changeConstellation" :show="msg"  :constellation="constellation"></app-modal>
		</div>
		<ul class="fortune">
			<li v-for="(item,key,index) in data.fortuneList" v-if="(item/16)&&!(item%16)">
				<span class="left">{{key}}</span> 
				<span  v-for="n in 5">
				<icon v-if="n <= item/16" name="starfill" scale="2"></icon>
				<icon v-else name="stargray" scale="2"></icon>
				</span>	
			</li>
			<li v-else>
				<div class="left">{{key}}</div>  
				<div class="right">{{item}}</div>
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
				day:"0",
				isActive:"0",
				selectDay:[
					{
						name:"今日"
					},
					{
						name:"明日"
					},
					{
						name:"本周"
					},
					{
						name:"本月"
					},
					{
						name:"今年"
					},
					{
						name:"爱情"
					}
				],
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
				// console.log(storage);
				this.changeMsg();
				this.postData();
			},
			changeDay(data) {
				this.day = data;
				this.isActive = data;
				// console.log(this.day);
				this.postData();
			},
			postData(){
				this.$http.post("http://chenguini.top/haha.php",qs.stringify(
					{constellation:this.constellation,day:this.day}
					))
				.then(res=>{
					this.data=res.data;
					console.log(this.data);
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
		padding-top: 40px;
		padding-bottom: 80px;
	}
	.content-head {
		text-align: center;
		padding-top: 10px;
	}
	.content-pic {
		width: 50px;
		height: 50px;
		background: #9cb9b9;
		border-radius: 30px;
		text-align: center;
		line-height: 75px;
		display:inline-block;
		vertical-align:middle;
	}
	.content-head span {
		display:inline-block;
		font-size: 20px;
		font-weight: bold;
		margin-left: 15px;
	}
	.content-foot {
		clear: both;
	}
	li {
		padding-left: 3%;
	}
	.fortune li {
		width: 47%;
		float: left;
		vertical-align: top;
		line-height: 25px;
	}
	.left {
		color: #000;
		float: left;
		padding-right: 3%;
	}
	.right {
		overflow: hidden;
		color: #333;
	}
	.content-foot {
		font-size: 16px;
	}
	.scrollNav {
		display: flex;
	}
	.scrollNav span {
		display: block;
		flex: 1;
		text-decoration: none;
		color: #999;
		text-align: center;
		background-color: #eee;
		padding: 5px 0;
	}
	.scrollNav .active {
		color: #9cb9b9;
		border-bottom: 2px solid #9cb9b9;
	}
</style>