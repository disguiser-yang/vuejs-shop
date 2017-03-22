<template>
  <div>
    <div class="each_child_wrap hot-goods product_wrap" v-for="item in goodsList">
        <div class="goods-image">
            
            <router-link  :to="'/goods/detail/' + item.goods_id">
            
                <img src="../assets/images/banner1.jpeg" >
            </router-link>
        </div>
        <div class="goods-detail">
            
            <router-link  :to="'/goods/detail/' + item.goods_id">
            
                <h5 class="goods-title">
                    {{ item.title }}
                </h5>
                <p class="goods-description">
                    {{ item.des }}
                </p>
                <ul class="tags-list">
                    
                      <li>
                          <i class="hot-goods-tag"></i>
                          <span>蔬鲜果甜</span>
                      </li>
                    
                      <li>
                          <i class="hot-goods-tag"></i>
                          <span>饱腹低卡路里</span>
                      </li>
                    
                      <li>
                          <i class="hot-goods-tag"></i>
                          <span>健身餐必备</span>
                      </li>
                    
                </ul>
                
                <div class="goods-comment">
                    <div>
                        <span class="comment-stars pull-left">
                            <i class="comment-star-5"></i>
                            <b class="comment-star-5"></b>
                        </span>
                        <span class="pull-right">
                            184****4829
                        </span>
                    </div>
                    <p>
                        特意吃了才来评论的，不错食材很新鲜！搭配得很全面，坚果蔬菜水果都有，很适合代餐！好评！
                    </p>
                    <label class="pull-right for-more">查看更多<i class="icon ion-ios-arrow-right"></i></label>
                </div>
                
           </router-link>
                
           
            
        </div>
    </div>
  

  </div>
</template>

<script>
export default {
  props: ['goodsList']
}
</script>

<style scoped lang="less">
.product_wrap{
  background-color: #fff;

  div.goods-image a img {
    width: 100%;
    height: 100%;
  }

  .goods-detail{
        a {
          display: block;
          color: #434343;
        }

        h5.goods-title {
          text-align: center;
          padding: 12px 0 0;
        }

        p.goods-description {
          margin-top: -5px;
          font-size: 12px;
          color: #707070;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          text-align: center;
          line-height: 20px;
        }

        .tags-list {
          margin-top: 10px;
          white-space: normal;
          overflow: hidden;
          width: 100%;

            ul {
              display: inline-block;
              white-space: nowrap;
              padding-right: 10px;
              font-size: 0;
              vertical-align: bottom;

            }
        



            li {
              width: auto;
              height: 22px;
              margin-left: 0;
              margin-right: 1.7%;
              display: inline-block;
              white-space: nowrap;
              margin-bottom: 8px;

                span {
                  display: inline-block;
                  height: 22px;
                  padding: 0 5px 0 3px;
                  border-radius: 0 3px 3px 0;
                  background-color: #434343;
                  line-height: 22px;
                  vertical-align: middle;
                  color: #fff;
                  font-size: 12px;
                  overflow: hidden;
                  white-space: nowrap;
                  text-overflow: ellipsis;
                  margin-left: -5px;
                }



                .hot-goods-tag {
                  display: inline-block;
                  width: 15px;
                  height: 22px;
                  background: url(../assets/images/tag_head1.png) no-repeat;
                  background-size: 100% 100%;
                  vertical-align: bottom;
              }
            }
        }


       


         
          .comment-stars{

            i {
              display: inline-block;
              height: 12px;
              background: url("../assets/images/star.jpg");
              background-size: auto 100%;
            }

            b {
              display: inline-block;
              height: 12px;
              background: url("../assets/images/defaultstar.png");
              background-size: auto 100%;
            }

          }
          .goods-comment {
            margin: 0 0 16px;
            padding: 2.7% 2.7% 0;
            border: 1px solid #d2d2d2;
            overflow: hidden;
          }

          .pull-right {
            float: right;
          }

          .goods-price{
            background-color: #fff;

            b {
              float: left;
              margin-top: 8px;
              font-size: 20px;
              font-weight: 500;
            }
          }

      


  }

  
  
        .goods-comment .for-more {
          margin-bottom: 10px;
          color: #a0a0a0;
          line-height: 22px;
          font-size: 13px;  
        }

        .goods-comment p {
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 4;
            overflow: hidden;
            font-size: 12px;
        }


        .app-field .control-group {
            position: relative;
            width: 100%;
            min-height: 30px;
            background-color: #fff;
            padding-bottom: 10px;
            /* margin: 0 0 3px; */
        }

        .text-nav {
            padding: 10px;
            background-color: #fff;
        }

        .text-nav-title {
            float: left;
            max-width: 85%;
            font-size: 0.9375rem;
            font-weight: bold;
            line-height: 22px;
            color: #585858
        }

        .text-nav-more {
            float: right;
            height: 22px;
            color: #777;
            line-height: 22px;
        }
 


}
</style>
