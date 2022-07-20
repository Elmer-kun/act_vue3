<template>
    <div class="containers">
        <div class="canvas" ref="canvas"></div><!-- 工具栏显示的地方 -->
        <div class="js-properties-panel" id="properties-panel"></div>
<!--    </div>      -->
    <!-- 把操作按钮写在这里面 -->
    <div class="action">
        <el-upload action class="upload-demo" :before-upload="openBpmn">
            <el-button icon="el-icon-folder-opened">open</el-button>
        </el-upload>
        <el-button class="new" icon="el-icon-circle-plus" @click="newDiagram">create</el-button>
        <el-button icon="el-icon-download" @click="downloadBpmn">downBpmn</el-button>
        <el-button icon="el-icon-picture" @click="downloadSvg">downSvg</el-button>
        <el-button icon="el-icon-picture" @click="deployment">deploy</el-button>
        <a hidden ref="downloadLink"></a>
    </div>
        </div>
</template>

<script>
    import axios from 'axios'
    import BpmnModeler from 'bpmn-js/lib/Modeler' // 引入 bpmn-js
    import minimapModule from 'diagram-js-minimap'
    // 工具栏相关
    import {
        BpmnPropertiesPanelModule,
        BpmnPropertiesProviderModule,
        CamundaPlatformPropertiesProviderModule
    } from "bpmn-js-properties-panel";
    // use Camunda BPMN Moddle extension
    import CamundaExtensionModule from 'camunda-bpmn-moddle/lib';
    import camundaModdleDescriptor from "camunda-bpmn-moddle/resources/camunda";
    import customTranslate from './customTranslate'; //todo:最新版本中很多需要自己手动汉化

    export default {
        name: "ModelerIndex",
        data () {
            return {
                bpmnModeler: null
            }
        },
        methods: {
            createNewDiagram() {
                const bpmnXmlStr = '<?xml version="1.0" encoding="UTF-8"?>\n        <bpmn2:definitions xmlns:bpmn2="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" id="sample-diagram" targetNamespace="http://bpmn.io/schema/bpmn" xsi:schemaLocation="http://www.omg.org/spec/BPMN/20100524/MODEL BPMN20.xsd">\n          <bpmn2:process id="process1567044459787" name="流程1567044459787">\n            <bpmn2:documentation>描述</bpmn2:documentation>\n            <bpmn2:startEvent id="StartEvent_1" name="开始"/>\n          </bpmn2:process>\n          <bpmndi:BPMNDiagram id="BPMNDiagram_1">\n            <bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="process1567044459787">\n              <bpmndi:BPMNShape id="_BPMNShape_StartEvent_2" bpmnElement="StartEvent_1">\n                <dc:Bounds x="184" y="64" width="36" height="36"/>\n                <bpmndi:BPMNLabel>\n                  <dc:Bounds x="191" y="40" width="22" height="14"/>\n                </bpmndi:BPMNLabel>\n              </bpmndi:BPMNShape>\n            </bpmndi:BPMNPlane>\n          </bpmndi:BPMNDiagram>\n        <processType id="test"/></bpmn2:definitions>\'';
                // const bpmnXmlStr = '';
                // 将字符串转换成图显示出来
                this.bpmnModeler.importXML(bpmnXmlStr, (err) => {
                    if (err) {
                        console.error(err)
                    }
                });
                this.bpmnModeler.get('minimap').open();
            },
            deployment(){
                // axios.defaults.baseURL = '/';
                // axios.defaults.headers.post['Content-Type'] = 'application/json';
                const that = this;
                this.bpmnModeler.saveXML({format:true}, (err,xml) =>{
                    if(!err){
                        console.log(xml);
                        axios.post('api/deployment',{
                            xmlStr:xml
                        }).then(function (respose) {
                            console.log(respose);
                            that.$message(respose.data);
                        }).catch(function (error) {
                            console.error(error);
                        })
                    }
                });
            },
            openBpmn(file) {
                const reader = new FileReader();
                // 读取File对象中的文本信息，编码格式为UTF-8
                reader.readAsText(file, "utf-8");
                reader.onload = () => {
                    //读取完毕后将文本信息导入到Bpmn建模器
                    this.createNewDiagram(reader.result);
                };
                return false;
            },
            downloadBpmn() {
                this.bpmnModeler.saveXML({ format: true }, (err, xml) => {
                    if (!err) {
                        // 获取文件名
                        const name = `${this.getFilename(xml)}.bpmn`;
                        // 将文件名以及数据交给下载方法
                        this.download({ name: name, data: xml });
                    }
                });
            },
            downloadSvg() {
                this.bpmnModeler.saveXML({ format: true }, (err, xml) => {
                    if (!err) {
                        // 获取文件名
                        const name = `${this.getFilename(xml)}.svg`;

                        // 从建模器画布中提取svg图形标签
                        let context = "";
                        const djsGroupAll = this.$refs.canvas.querySelectorAll(".djs-group");
                        for (let item of djsGroupAll) {
                            context += item.innerHTML;
                        }
                        // 获取svg的基本数据，长宽高
                        const viewport = this.$refs.canvas.querySelector(".viewport").getBBox();

                        // 将标签和数据拼接成一个完整正常的svg图形
                        const svg = `
            <svg
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              width="${viewport.width}"
              height="${viewport.height}"
              viewBox="${viewport.x} ${viewport.y} ${viewport.width} ${viewport.height}"
              version="1.1"
              >
              ${context}
            </svg>
          `;
                        // 将文件名以及数据交给下载方法
                        this.download({ name: name, data: svg });
                    }
                });
            },
            getFilename(xml) {
                let start = xml.indexOf("process");
                let filename = xml.substr(start, xml.indexOf(">"));
                filename = filename.substr(filename.indexOf("id") + 4);
                filename = filename.substr(0, filename.indexOf('"'));
                return filename;
            },
            download({ name = "diagram.bpmn", data }) {
                // 这里就获取到了之前设置的隐藏链接
                const downloadLink = this.$refs.downloadLink;
                // 把数据转换为URI，下载要用到的
                const encodedData = encodeURIComponent(data);

                if (data) {
                    // 将数据给到链接
                    downloadLink.href =
                        "data:application/bpmn20-xml;charset=UTF-8," + encodedData;
                    // 设置文件名
                    downloadLink.download = name;
                    // 触发点击事件开始下载
                    downloadLink.click();
                }
            },
            newDiagram() {
                // this.createNewDiagram();
                console.log(this.bpmnModeler.get('propertiesPanel'));
            },
        },
        mounted() {
            const canvas = this.$refs.canvas;
            // 将汉化包装成一个模块
            const customTranslateModule = {
                translate: ["value",customTranslate]
            };
            // 生成实例
            this.bpmnModeler = new BpmnModeler({
                container: canvas,  // 加入工具栏支持
                propertiesPanel: {
                    parent: "#properties-panel"
                },
                additionalModules: [BpmnPropertiesPanelModule, BpmnPropertiesProviderModule,minimapModule,
                    CamundaPlatformPropertiesProviderModule, CamundaExtensionModule,customTranslateModule],
                moddleExtensions: {
                    camunda: camundaModdleDescriptor
                }
            });
            this.createNewDiagram(); // 新增流程定义
        }
    }
</script>

<style lang="scss">
    @import "~bpmn-js-properties-panel/dist/assets/properties-panel.css";
    @import "~bpmn-js-properties-panel/dist/assets/element-templates.css";
    /*左边工具栏以及编辑节点的样式*/
    @import '~bpmn-js/dist/assets/diagram-js.css';
    @import '~bpmn-js/dist/assets/bpmn-font/css/bpmn.css';
    @import '~bpmn-js/dist/assets/bpmn-font/css/bpmn-codes.css';
    @import '~bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css';
    @import '~diagram-js-minimap/assets/diagram-js-minimap.css';
    .containers{
        position: absolute;
        display: flex;
        background-color: #ffffff;
        width: 100%;
        height: 100%;
        .canvas{
            width: 100%;
            height: 60%;
        }
        .bjs-powered-by {
            display: none;
        }
        .js-properties-panel {
             width: 320px;
             height: inherit;
             overflow-y: auto;
         }
    }
    .action {
         position: fixed;
         bottom: 10px;
         left: 10px;
         display: flex;
     }
    .upload-demo {
        margin-right: 10px;
    }
</style>
