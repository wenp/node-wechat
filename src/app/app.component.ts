import {Component} from '@angular/core';
import {Http} from '@angular/http';
import {TranslateService} from 'ng2-translate';
import 'rxjs/add/operator/map';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    public allData: Array<object>;
    public total: Array<string>;

    constructor(public http: Http,
                public translate: TranslateService) {

    }
    // 更改语言
    changeLeng(val) {
        if(val)
        this.setLanguage(val);
    }
    // 更改账单
    changeDate(val) {
        if(!val) return;
        this.getPageInfo(val.split('.')[0],val.split('.')[1])
    }
    // init 函数
    ngOnInit() {
        // 默认渲染
        this.setLanguage();
        this.getTotal();
        this.getPageInfo(2017, 7);
    }

    getTotal () {
        // 需要更改下 api 地址
        this.http.get(`http://localhost/api/getBilltotal`)
            .map(res => res.json())
            .subscribe(data => {
                this.total = data.data;
            })
    }

    getPageInfo(year, month) {
        // 需要更改下 api 地址
        this.http.get(`http://localhost/api/getBillInfo/${year}/${month}`)
            .map((res) => res.json())
            .subscribe((data) => {

                if(data.data){
                    this.allData = data.data;
                }else {
                    this.allData = [["数据不存在","数据不存在","数据不存在",""]]
                }
            });
    }



    setLanguage(language: string = 'zh') {
        // this.translate.getBrowserLang()  // 检测浏览器语言
        this.translate.addLangs(['zh', 'en']);
        // this.translate.setDefaultLang('zh');
        this.translate.use(language); // 使用语言
    }
}
