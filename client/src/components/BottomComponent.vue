<script setup>

</script>

<template>
    <div class="bottom-container">
        <div class="bottom-up">
            <div class="left">
                <div class="travel-part">
                    <dl>
                        <dt><a href="#">旅游资讯</a></dt>
                        <dd><a href="#">宾馆索引</a></dd>
                        <dd><a href="#">攻略索引</a></dd>
                        <dd><a href="#">机票索引</a></dd>
                        <dd><a href="#">网站导航</a></dd>
                        <dd><a href="#">旅游索引</a></dd>
                        <dd><a href="#">邮轮索引</a></dd>
                        <dd><a href="#">企业差旅索引</a></dd>
                    </dl>
                </div>
                <div class="union-part">
                    <dl>
                        <dt><a href="#">加盟合作</a></dt>
                        <dd><a href="#">分销联盟</a></dd>
                        <dd><a href="#">友情链接</a></dd>
                        <dd><a href="#">企业礼品卡采购</a></dd>
                        <dd><a href="#">保险代理</a></dd>
                        <dd><a href="#">代理合作</a></dd>
                        <dd><a href="#">酒店加盟</a></dd>
                        <dd><a href="#">目的地及景区合作</a></dd>
                        <dd><a href="#">更多加盟合作</a></dd>
                    </dl>
                </div>
                <div class="about-part">
                    <dl>
                        <dt><a href="#">关于携程</a></dt>
                        <dd><a href="#">关于携程</a></dd>
                        <dd><a href="#">携程热点</a></dd>
                        <dd><a href="#">联系我们</a></dd>
                        <dd><a href="#">诚聘英才</a></dd>
                        <dd><a href="#">用户协议</a></dd>
                        <dd><a href="#">隐私政策</a></dd>
                        <dd><a href="#">营业执照</a></dd>
                        <dd><a href="#">安全中心</a></dd>
                        <dd><a href="#">携程内容中心</a></dd>
                        <dd><a href="#">知识产权</a></dd>
                        <dd><a href="#">Trip.com Group</a></dd>
                    </dl>
                </div>
            </div>
            <div class="right">
                <div class="info-part">
                    <p>境内：95010 或 400-830-6666</p>
                    <p>中国香港：+852-3008-3295</p>
                    <p>中国澳门：+86-21 3406-4888</p>
                    <p>中国台湾：+86-21 3406-4888</p>
                    <p>其他国家和地区：+86-21-3406-4888</p>
                </div>
                <div class="qrcode-part">
                    <img class="qrcode" src="../assets/qrcode.jpg">
                    <p class="qrcode-text">扫码下载携程App</p>
                </div>
            </div>
        </div>
        <div class="bottom-down">
            <p>Copyright©1999-2026, ctrip.com. All rights reserved. | ICP证：沪B2-20050130 | 沪ICP备08023580号-3 |
                网信算备310105117481904230015号</p>
            <p><span class="hu-picture"></span>沪公网备31010502002731号丨互联网药品信息服务资格证丨（沪）网械平台备字[2022]第00001号 | 沪网食备1050001号 | 旅游度假资质 | 平台信息</p>
            <p>违法和不良信息举报电话021-22500846丨全国旅游投诉热线12345丨上海市旅游网站落实诚信建设主体责任承诺书</p>
            <div class="bottom-img">
                <a href="#" style=""></a>
            </div>
            <div class="credit-container">
                <a href="#" title="上海市监" class="credit-link shanghai-supervise">上海市监</a>
                <a href="#" title="征信网" class="credit-link">网络社会征信网</a>
                <a href="#" title="违法和不良信息举报" class="credit-link net-credit"></a>
                <a href="#" title="可信网站身份验证" class="credit-link identity-verify"></a>·
                <a href="#" title="信用中国" class="credit-link credit-china"></a>
                <a href="#" title="有害信息举报" class="credit-link harmful-info"></a>
                <a href="#" title="消费维权" class="credit-link consumer-rights"></a>
                <a href="#" title="适老化无障碍阅读" class="complete-img"><img src="../assets/bottomimg/oldAssist.png" alt=""></a>
            </div>
        </div>
    </div>

</template>

<style scoped lang="less">
.bottom-container {
    background-color: #f8fafd;
    padding: 100px 50px;
    font-size: 12px;
    color: #666;
    .bottom-up {
        display: flex;
        align-items: center;
        justify-content: space-between;
        

        .left {
            display: flex;
            gap: 50px;

            >div {
                width: 217px;
                height: 198px;
                border-right: 1px solid #dadfe6;

                dl {
                    display: flex;
                    flex-wrap: wrap;

                    dt {
                        flex: 0 0 100%;
                        color: #333;
                        font-size: 20px;
                        margin-bottom: 10px;
                    }

                    dd {
                        flex: 0 0 50%;
                        margin: 0;
                        padding: 5px 0;
                        box-sizing: border-box;
                    }

                    dd:hover {
                        color: #1989f7;
                    }
                }
            }
        }

        .right {
            display: flex;
            width: 346px;
            height: 198px;
            margin-right: 120px;

            .info-part {
                padding-top: 42px;
                width: 220px;
                height: 198px;
                line-height: 25px;
            }

            .qrcode-part {
                margin-top: 42px;
            }

            .qrcode {
                width: 120px;
                height: 120px;
            }

            .qrcode-text {
                color: #333;
                font-size: 14px;
                margin-top: 7px;
                margin-left: 2px;
            }
        }
    }
    .bottom-down {
        margin-top: 30px;
        text-align: center;
        p {
            line-height: 24px;
        }
        .hu-picture {
            display: inline-block;
            width: 22px;
            height: 22px;
            background-image: url(../assets/bottomimg/phoneList.png);
            background-position: 0px -238px;
            background-size: 150px auto;
            vertical-align: middle;
            margin-right: 5px;
        }
        .credit-container {
            display: flex;
            justify-content: center;
            margin-top: 15px;
        }
        .credit-link {
            display: inline-flex;
            width: 88px;
            height: 34px;
            font-size: 11px;
            border: 0.8px solid rgb(209, 209, 209);
            border-radius: 3px;
            margin-right: 10px;
            &::before {
                content: "";
                flex-shrink: 0;
                width: 38px;
                height: 30px;
                background-image: url(../assets/bottomimg/phoneList.png);
                background-position: -88px -119px;
            }
        }
        .shanghai-supervise {
            &::before {
                background-position: -88px -85px; // 单独调整它的背景位置
            }
        }
        .net-credit {
            &::before {
                width: 88px;
                height: 30px;
                background-position: 0px -385px; // 单独调整它的背景位置
            }
        }
        .identity-verify {
            width: 90px;
            &::before {
                width: 90px;
                height: 30px;
                background-position: 0px -119px; // 单独调整它的背景位置
            }
        }
        .credit-china {
            width: 103px;
            &::before {
                width: 100px;
                height: 30px;
                background-position: 0px -430px; // 单独调整它的背景位置
            }
        }

        .harmful-info {
            background-color: #538ecb;
            width: 116px;
            &::before {
                width: 120px;
                height: 32px;
                background-position: 0px -154px; // 单独调整它的背景位置
            }
        }

        .consumer-rights {
            width: 50px;
            &::before {
                width: 48px;
                height: 30px;
                background-position: 0px -480px; // 单独调整它的背景位置
            }
        }


        .complete-img {
            display: inline-block;
            width: 100px;
            border: 0.8px solid rgb(209, 209, 209);
            border-radius: 3px;
        }
    }
}
</style>
