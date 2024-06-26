var styles = [];
var websites = [];
var key = "";
var user_role = '';
var isSearching = false;
var skipConfirm = false;
var minPrice = 0, maxPrice = 10000000000;
var rowStyleHTML = [
    `
    <button class="Xbutton"><i class="fa-solid fa-xmark"></i></button>
    <div id="window_style_1">
        <div>
            <h3 class="website-name"></h3>
        </div>
        <div>
            <div class="window-child-left">
                <label for="adsPosition">Vị trí (*)</label>
                <input type="text" name="" id="adsPosition">
            </div>
            <div class="window-child-right">
                <label for="platform">Nền tảng</label>
                <select name="" id="platform">
                    <option value="PC">PC</option>
                    <option value="Mobile">Mobile</option>
                    <option value="PC & Mobile">PC & Mobile</option>
                </select>
            </div>
        </div>
        <div>
            <div>
                <label for="dimensions">Kích thước (*)</label>
                <textarea name="" id="dimensions" cols="30" rows="7"></textarea>
            </div>
        </div>
        <div>
            <div class="demo-container">
                <h3>DEMO (*)</h3>
                <div>
                    <input type="text" class="content" placeholder="Content">
                    <i class="fa-solid fa-link"></i>
                    <input class="link-demo" type="text" placeholder="Link demo">
                </div>
                <button class="add-demo" title="Thêm demo"><i class="fa-solid fa-plus"></i></button>
            </div>
        </div>
        <div>
            <div class="window-child-left">
                <label for="col1">Cách tính giá</label>
                <select name="" id="col1">
                    <option value="Độc quyền ngày">Độc quyền ngày</option>
                    <option value="Độc quyền/tuần">Độc quyền/tuần</option>
                    <option value="Độc quyền/tháng">Độc quyền/tháng</option>
                    <option value="Chia sẻ 3/ngày">Chia sẻ 3/ngày</option>
                    <option value="Chia sẻ 5/ngày">Chia sẻ 5/ngày</option>
                    <option value="Chia sẻ 3/tuần">Chia sẻ 3/tuần</option>
                    <option value="Chia sẻ 5/tuần">Chia sẻ 5/tuần</option>
                </select>
            </div>
            <div class="window-child-right">
                <label for="col2">Trang chủ</label>
                <input type="text" id="col2" class="price">
            </div>
        </div>
        <div>
            <div class="window-child-left">
                <label for="col3">Roadblock Xuyên site (Độc quyền ngày)</label>
                <input type="text" id="col3" class="price">
            </div>
            <div class="window-child-right">
                <label for="col4">CTR Trung bình (%)</label>
                <input type="text" id="col4" class="performance">
            </div>
        </div>
        <div>
            <div>
                <label for="col5">Est. Traffic/Tuần/slot</label>
                <input type="text" id="col5" class="performance">
            </div>
        </div>
    </div>
    <button class="save">SAVE</button>
    `,
    `
    <button class="Xbutton"><i class="fa-solid fa-xmark"></i></button>
    <div id="window_style_2">
        <div>
            <h3 class="website-name"></h3>
        </div>
        <div>
            <div class="window-child-left">
                <label for="adsPosition">Vị trí (*)</label>
                <input type="text" name="" id="adsPosition">
            </div>
            <div class="window-child-right">
                <label for="platform">Nền tảng</label>
                <select name="" id="platform">
                    <option value="PC">PC</option>
                    <option value="Mobile">Mobile</option>
                    <option value="PC & Mobile">PC & Mobile</option>
                </select>
            </div>
        </div>
        <div>
            <div>
                <label for="dimensions">Kích thước (*)</label>
                <textarea name="" id="dimensions" cols="30" rows="7"></textarea>
            </div>
        </div>
        <div>
            <div class="demo-container">
                <h3>DEMO (*)</h3>
                <div>
                    <input type="text" class="content" placeholder="Content">
                    <i class="fa-solid fa-link"></i>
                    <input class="link-demo" type="text" placeholder="Link demo">
                </div>
                <button class="add-demo" title="Thêm demo"><i class="fa-solid fa-plus"></i></button>
            </div>
        </div>
        <div>
            <div class="window-child-left">
                <label for="col1">Cách tính giá</label>
                <select name="" id="col1">
                    <option value="Độc quyền ngày">Độc quyền ngày</option>
                    <option value="Độc quyền/tuần">Độc quyền/tuần</option>
                    <option value="Độc quyền/tháng">Độc quyền/tháng</option>
                    <option value="Chia sẻ 3/ngày">Chia sẻ 3/ngày</option>
                    <option value="Chia sẻ 5/ngày">Chia sẻ 5/ngày</option>
                    <option value="Chia sẻ 3/tuần">Chia sẻ 3/tuần</option>
                    <option value="Chia sẻ 5/tuần">Chia sẻ 5/tuần</option>
                </select>
            </div>
            <div class="window-child-right">
                <label for="col2">Đơn giá (VNĐ)</label>
                <input type="text" id="col2" class="price">
            </div>
        </div>
        <div>
            <div class="window-child-left">
                <label for="col3">CTR trung bình (%)</label>
                <input type="text" id="col3" class="performance">
            </div>
            <div class="window-child-right">
                <label for="col4">Est Impression</label>
                <input type="text" id="col4" class="performance">
            </div>
        </div>
        <div>
            <div>
                <label for="col5">Note</label>
                <input type="text" id="col5">
            </div>
        </div>
    </div>
    <button class="save">SAVE</button>
    `,
    `
    <button class="Xbutton"><i class="fa-solid fa-xmark"></i></button>
    <div id="window_style_3">
        <div>
            <h3 class="website-name"></h3>
        </div>
        <div>
            <div class="window-child-left">
                <label for="adsPosition">Vị trí (*)</label>
                <input type="text" name="" id="adsPosition">
            </div>
            <div class="window-child-right">
                <label for="platform">Nền tảng</label>
                <select name="" id="platform">
                    <option value="PC">PC</option>
                    <option value="Mobile">Mobile</option>
                    <option value="PC & Mobile">PC & Mobile</option>
                </select>
            </div>
        </div>
        <div>
            <div>
                <label for="dimensions">Kích thước (*)</label>
                <textarea name="" id="dimensions" cols="30" rows="7"></textarea>
            </div>
        </div>
        <div>
            <div class="demo-container">
                <h3>DEMO (*)</h3>
                <div>
                    <input type="text" class="content" placeholder="Content">
                    <i class="fa-solid fa-link"></i>
                    <input class="link-demo" type="text" placeholder="Link demo">
                </div>
                <button class="add-demo" title="Thêm demo"><i class="fa-solid fa-plus"></i></button>
            </div>
        </div>
        <div>
            <div class="window-child-left">
                <label for="col1">Cách tính giá</label>
                <select name="" id="col1">
                    <option value="Độc quyền ngày">Độc quyền ngày</option>
                    <option value="Độc quyền/tuần">Độc quyền/tuần</option>
                    <option value="Độc quyền/tháng">Độc quyền/tháng</option>
                    <option value="Chia sẻ 3/ngày">Chia sẻ 3/ngày</option>
                    <option value="Chia sẻ 5/ngày">Chia sẻ 5/ngày</option>
                    <option value="Chia sẻ 3/tuần">Chia sẻ 3/tuần</option>
                    <option value="Chia sẻ 5/tuần">Chia sẻ 5/tuần</option>
                </select>
            </div>
            <div class="window-child-right">
                <label for="col2">Trang chủ (Đã bao gồm VAT)</label>
                <input type="text" id="col2" class="price">
            </div>
        </div>
        <div>
            <div class="window-child-left">
                <label for="col3">Xuyên trang (Đã bao gồm VAT)</label>
                <input type="text" id="col3" class="price">
            </div>
            <div class="window-child-right">
                <label for="col4">Chuyên mục (*) (Đã bao gồm VAT)</label>
                <input type="text" id="col4" class="price">
            </div>
        </div>
        <div>
            <div>
                <label for="col5">Est. Traffic</label>
                <input type="text" id="col5" class="performance">
            </div>
        </div>
    </div>
    <button class="save">SAVE</button>
    `,
    `
    <button class="Xbutton"><i class="fa-solid fa-xmark"></i></button>
    <div id="window_style_4">
        <div>
            <h3 class="website-name"></h3>
        </div>
        <div>
            <div class="window-child-left">
                <label for="adsPosition">Vị trí (*)</label>
                <input type="text" name="" id="adsPosition">
            </div>
            <div class="window-child-right">
                <label for="platform">Nền tảng</label>
                <select name="" id="platform">
                    <option value="PC">PC</option>
                    <option value="Mobile">Mobile</option>
                    <option value="PC & Mobile">PC & Mobile</option>
                </select>
            </div>
        </div>
        <div>
            <div>
                <label for="dimensions">Kích thước (*)</label>
                <textarea name="" id="dimensions" cols="30" rows="7"></textarea>
            </div>
        </div>
        <div>
            <div class="demo-container">
                <h3>DEMO (*)</h3>
                <div>
                    <input type="text" class="content" placeholder="Content">
                    <i class="fa-solid fa-link"></i>
                    <input class="link-demo" type="text" placeholder="Link demo">
                </div>
                <button class="add-demo" title="Thêm demo"><i class="fa-solid fa-plus"></i></button>
            </div>
        </div>
        <div>
            <div class="window-child-left">
                <label for="col1">Cách tính giá</label>
                <select name="" id="col1">
                    <option value="Độc quyền ngày">Độc quyền ngày</option>
                    <option value="Độc quyền/tuần">Độc quyền/tuần</option>
                    <option value="Độc quyền/tháng">Độc quyền/tháng</option>
                    <option value="Chia sẻ 3/ngày">Chia sẻ 3/ngày</option>
                    <option value="Chia sẻ 5/ngày">Chia sẻ 5/ngày</option>
                    <option value="Chia sẻ 3/tuần">Chia sẻ 3/tuần</option>
                    <option value="Chia sẻ 5/tuần">Chia sẻ 5/tuần</option>
                </select>
            </div>
            <div class="window-child-right">
                <label for="col2">Trang chủ (Đã bao gồm VAT)</label>
                <input type="text" id="col2" class="price">
            </div>
        </div>
        <div>
            <div class="window-child-left">
                <label for="col3">Roadblock Xuyên site (Độc quyền ngày) (Chưa gồm VAT)</label>
                <input type="text" id="col3" class="price">
            </div>
            <div class="window-child-right">
                <label for="col4">CTR Trung bình (%)</label>
                <input type="text" id="col4" class="performance">
            </div>
        </div>
        <div>
            <div>
                <label for="col5">Est. Traffic</label>
                <input type="text" id="col5" class="performance">
            </div>
        </div>
    </div>
    <button class="save">SAVE</button>
    `,
    `
    <button class="Xbutton"><i class="fa-solid fa-xmark"></i></button>
    <div id="window_style_6">
        <div>
            <h3 class="website-name"></h3>
        </div>
        <div>
            <div class="window-child-left">
                <label for="adsPosition">Vị trí (*)</label>
                <input type="text" name="" id="adsPosition">
            </div>
            <div class="window-child-right">
                <label for="platform">Nền tảng</label>
                <select name="" id="platform">
                    <option value="PC">PC</option>
                    <option value="Mobile">Mobile</option>
                    <option value="PC & Mobile">PC & Mobile</option>
                </select>
            </div>
        </div>
        <div>
            <div>
                <label for="dimensions">Kích thước (*)</label>
                <textarea name="" id="dimensions" cols="30" rows="7"></textarea>
            </div>
        </div>
        <div>
            <div class="demo-container">
                <h3>DEMO (*)</h3>
                <div>
                    <input type="text" class="content" placeholder="Content">
                    <i class="fa-solid fa-link"></i>
                    <input class="link-demo" type="text" placeholder="Link demo">
                </div>
                <button class="add-demo" title="Thêm demo"><i class="fa-solid fa-plus"></i></button>
            </div>
        </div>
        <div>
            <div class="window-child-left">
                <label for="col1">Tuần (Chia sẻ 3)</label>
                <input type="text" id="col1" class="price">
            </div>
            <div class="window-child-right">
                <label for="col2">Tháng (Chia sẻ 3)</label>
                <input type="text" id="col2" class="price">
            </div>
        </div>
        <div>
            <div class="window-child-left">
                <label for="col3">Quý (Chia sẻ 3)</label>
                <input type="text" id="col3" class="price">
            </div>
            <div class="window-child-right">
                <label for="col4">Est. CTR (%)</label>
                <input type="text" id="col4" class="performance">
            </div>
        </div>
        <div>
            <div>
                <label for="col5">Est. Traffic</label>
                <input type="text" id="col5" class="performance">
            </div>
        </div>
    </div>
    <button class="save">SAVE</button>
    `,
    
    `
    <button class="Xbutton"><i class="fa-solid fa-xmark"></i></button>
    <div id="window_style_5">
        <div>
            <h3 class="website-name"></h3>
        </div>
        <div>
            <div class="window-child-left">
                <label for="adsPosition">Vị trí (*)</label>
                <input type="text" name="" id="adsPosition">
            </div>
            <div class="window-child-right">
                <label for="platform">Nền tảng</label>
                <select name="" id="platform">
                    <option value="PC">PC</option>
                    <option value="Mobile">Mobile</option>
                    <option value="PC & Mobile">PC & Mobile</option>
                </select>
            </div>
        </div>
        <div>
            <div>
                <label for="dimensions">Kích thước (*)</label>
                <textarea name="" id="dimensions" cols="30" rows="7"></textarea>
            </div>
        </div>
        <div>
            <div class="demo-container">
                <h3>DEMO (*)</h3>
                <div>
                    <input type="text" class="content" placeholder="Content">
                    <i class="fa-solid fa-link"></i>
                    <input class="link-demo" type="text" placeholder="Link demo">
                </div>
                <button class="add-demo" title="Thêm demo"><i class="fa-solid fa-plus"></i></button>
            </div>
        </div>
        <div>
            <div class="window-child-left">
                <label for="col1">Cách tính giá</label>
                <select name="" id="col1">
                    <option value="Độc quyền ngày">Độc quyền ngày</option>
                    <option value="Độc quyền/tuần">Độc quyền/tuần</option>
                    <option value="Độc quyền/tháng">Độc quyền/tháng</option>
                    <option value="Chia sẻ 3/ngày">Chia sẻ 3/ngày</option>
                    <option value="Chia sẻ 5/ngày">Chia sẻ 5/ngày</option>
                    <option value="Chia sẻ 3/tuần">Chia sẻ 3/tuần</option>
                    <option value="Chia sẻ 5/tuần">Chia sẻ 5/tuần</option>
                </select>
            </div>
            <div class="window-child-right">
                <label for="col2">Trang chủ</label>
                <input type="text" id="col2" class="price">
            </div>
        </div>
        <div>
            <div class="window-child-left">
                <label for="col3">Xuyên trang chi tiết</label>
                <input type="text" id="col3" class="price">
            </div>
            <div class="window-child-right">
                <label for="col4">Xuyên trang</label>
                <input type="text" id="col4" class="price">
            </div>
        </div>
        <div>
            <div>
                <label for="col5">Est Traffic/Tuần/Slot</label>
                <input type="text" id="col5" class="performance">
            </div>
        </div>
    </div>
    <button class="save">SAVE</button>
    `
];

var rowStyleNewWebsiteHTML = [
    `
    <div>
        <div class="window-child-left">
            <label for="col1">Cách tính giá</label>
            <select name="" id="col1">
                <option value="Độc quyền ngày">Độc quyền ngày</option>
                <option value="Độc quyền/tuần">Độc quyền/tuần</option>
                <option value="Độc quyền/tháng">Độc quyền/tháng</option>
                <option value="Chia sẻ 3/ngày">Chia sẻ 3/ngày</option>
                <option value="Chia sẻ 5/ngày">Chia sẻ 5/ngày</option>
                <option value="Chia sẻ 3/tuần">Chia sẻ 3/tuần</option>
                <option value="Chia sẻ 5/tuần">Chia sẻ 5/tuần</option>
            </select>
        </div>
        <div class="window-child-right">
            <label for="col2">Trang chủ</label>
            <input type="text" id="col2" class="price">
        </div>
    </div>
    <div>
        <div class="window-child-left">
            <label for="col3">Roadblock Xuyên site (Độc quyền ngày)</label>
            <input type="text" id="col3" class="price">
        </div>
        <div class="window-child-right">
            <label for="col4">CTR Trung bình (%)</label>
            <input type="text" id="col4" class="performance">
        </div>
    </div>
    <div>
        <div>
            <label for="col5">Est. Traffic/Tuần/slot</label>
            <input type="text" id="col5" class="performance">
        </div>
    </div>
    `,
    `
    <div>
        <div class="window-child-left">
            <label for="col1">Cách tính giá</label>
            <select name="" id="col1">
                <option value="Độc quyền ngày">Độc quyền ngày</option>
                <option value="Độc quyền/tuần">Độc quyền/tuần</option>
                <option value="Độc quyền/tháng">Độc quyền/tháng</option>
                <option value="Chia sẻ 3/ngày">Chia sẻ 3/ngày</option>
                <option value="Chia sẻ 5/ngày">Chia sẻ 5/ngày</option>
                <option value="Chia sẻ 3/tuần">Chia sẻ 3/tuần</option>
                <option value="Chia sẻ 5/tuần">Chia sẻ 5/tuần</option>
            </select>
        </div>
        <div class="window-child-right">
            <label for="col2">Đơn giá (VNĐ)</label>
            <input type="text" id="col2" class="price">
        </div>
    </div>
    <div>
        <div class="window-child-left">
            <label for="col3">CTR trung bình (%)</label>
            <input type="text" id="col3" class="performance">
        </div>
        <div class="window-child-right">
            <label for="col4">Est Impression</label>
            <input type="text" id="col4" class="performance">
        </div>
    </div>
    <div>
        <div>
            <label for="col5">Note</label>
            <input type="text" id="col5">
        </div>
    </div>
    `,
    `
    <div>
        <div class="window-child-left">
            <label for="col1">Cách tính giá</label>
            <select name="" id="col1">
                <option value="Độc quyền ngày">Độc quyền ngày</option>
                <option value="Độc quyền/tuần">Độc quyền/tuần</option>
                <option value="Độc quyền/tháng">Độc quyền/tháng</option>
                <option value="Chia sẻ 3/ngày">Chia sẻ 3/ngày</option>
                <option value="Chia sẻ 5/ngày">Chia sẻ 5/ngày</option>
                <option value="Chia sẻ 3/tuần">Chia sẻ 3/tuần</option>
                <option value="Chia sẻ 5/tuần">Chia sẻ 5/tuần</option>
            </select>
        </div>
        <div class="window-child-right">
            <label for="col2">Trang chủ (Đã bao gồm VAT)</label>
            <input type="text" id="col2" class="price">
        </div>
    </div>
    <div>
        <div class="window-child-left">
            <label for="col3">Xuyên trang (Đã bao gồm VAT)</label>
            <input type="text" id="col3" class="price">
        </div>
        <div class="window-child-right">
            <label for="col4">Chuyên mục (*) (Đã bao gồm VAT)</label>
            <input type="text" id="col4" class="price">
        </div>
    </div>
    <div>
        <div>
            <label for="col5">Est. Traffic</label>
            <input type="text" id="col5" class="performance">
        </div>
    </div>
    `,
    `
    <div>
        <div class="window-child-left">
            <label for="col1">Cách tính giá</label>
            <select name="" id="col1">
                <option value="Độc quyền ngày">Độc quyền ngày</option>
                <option value="Độc quyền/tuần">Độc quyền/tuần</option>
                <option value="Độc quyền/tháng">Độc quyền/tháng</option>
                <option value="Chia sẻ 3/ngày">Chia sẻ 3/ngày</option>
                <option value="Chia sẻ 5/ngày">Chia sẻ 5/ngày</option>
                <option value="Chia sẻ 3/tuần">Chia sẻ 3/tuần</option>
                <option value="Chia sẻ 5/tuần">Chia sẻ 5/tuần</option>
            </select>
        </div>
        <div class="window-child-right">
            <label for="col2">Trang chủ (Đã bao gồm VAT)</label>
            <input type="text" id="col2" class="price">
        </div>
    </div>
    <div>
        <div class="window-child-left">
            <label for="col3">Roadblock Xuyên site (Độc quyền ngày) (Chưa gồm VAT)</label>
            <input type="text" id="col3" class="price">
        </div>
        <div class="window-child-right">
            <label for="col4">CTR Trung bình (%)</label>
            <input type="text" id="col4" class="performance">
        </div>
    </div>
    <div>
        <div>
            <label for="col5">Est. Traffic</label>
            <input type="text" id="col5" class="performance">
        </div>
    </div>
    `,
    `
    <div>
        <div class="window-child-left">
            <label for="col1">Tuần (Chia sẻ 3)</label>
            <input type="text" id="col1" class="price">
        </div>
        <div class="window-child-right">
            <label for="col2">Tháng (Chia sẻ 3)</label>
            <input type="text" id="col2" class="price">
        </div>
    </div>
    <div>
        <div class="window-child-left">
            <label for="col3">Quý (Chia sẻ 3)</label>
            <input type="text" id="col3" class="price">
        </div>
        <div class="window-child-right">
            <label for="col4">Est. CTR (%)</label>
            <input type="text" id="col4" class="performance">
        </div>
    </div>
    <div>
        <div>
            <label for="col5">Est. Traffic</label>
            <input type="text" id="col5" class="performance">
        </div>
    </div>
    `,
    
    `
    <div>
        <div class="window-child-left">
            <label for="col1">Cách tính giá</label>
            <select name="" id="col1">
                <option value="Độc quyền ngày">Độc quyền ngày</option>
                <option value="Độc quyền/tuần">Độc quyền/tuần</option>
                <option value="Độc quyền/tháng">Độc quyền/tháng</option>
                <option value="Chia sẻ 3/ngày">Chia sẻ 3/ngày</option>
                <option value="Chia sẻ 5/ngày">Chia sẻ 5/ngày</option>
                <option value="Chia sẻ 3/tuần">Chia sẻ 3/tuần</option>
                <option value="Chia sẻ 5/tuần">Chia sẻ 5/tuần</option>
            </select>
        </div>
        <div class="window-child-right">
            <label for="col2">Trang chủ</label>
            <input type="text" id="col2" class="price">
        </div>
    </div>
    <div>
        <div class="window-child-left">
            <label for="col3">Xuyên trang chi tiết</label>
            <input type="text" id="col3" class="price">
        </div>
        <div class="window-child-right">
            <label for="col4">Xuyên trang</label>
            <input type="text" id="col4" class="price">
        </div>
    </div>
    <div>
        <div>
            <label for="col5">Est Traffic/Tuần/Slot</label>
            <input type="text" id="col5" class="performance">
        </div>
    </div>
    `
];

const token = localStorage.getItem('jwtToken');

$(document).ready(function() {
    fetch(`http://localhost:3030/api/authentication?token=${ token }`, {
        method: "GET",
        headers: {
            "Content-Type" : "application/json",
            "authorization" : token
        }
    })
    .then(response => {
        return response.json().then(data => {
            if (!response.ok) {
                showNotification(data.message);
                throw new Error('Network response was not ok');
            }
            return data;
        });
    })
    .then(result => {
        user_role = result.role;
    })
    .catch(error => {
        console.error('There was a problem with your fetch operation:', error);
    });
    fetch('http://localhost:3030/api/websites', {
        method: "GET",
        headers: {
            "Content-Type" : "application/json",
            "authorization" : token
            
        }
    })
    .then(response => {
        return response.json().then(data => {
            if (!response.ok) {
                showNotification(data.message);
                throw new Error('Network response was not ok');
            }
            return data;
        });
    })
    .then(result => {
        websites = result.data;
    })
    .catch(error => {
        console.error('There was a problem with your fetch operation:', error);
    });

    fetch('http://localhost:3030/api/style', {
        method: "GET",
        headers: {
            "Content-Type" : "application/json",
            "authorization" : token
            
        }
    })
    .then(response => {
        return response.json().then(data => {
            if (!response.ok) {
                showNotification(data.message);
                throw new Error('Network response was not ok');
            }
            return data;
        });
    })
    .then(result => {
        styles = result;
        search();
    })
    .catch(error => {
        console.error('There was a problem with your fetch operation:', error);
    });
});


// on homepage
$(document).ready(function() {
    $(document).on('input', 'input', function(event) {
        event.stopPropagation();

        $(this).removeClass('warning-border')
    });

    $(document).on('click', '.logo-web', function(event) {
        event.stopPropagation();

        window.location.href = "http://localhost:3030/admin"
    });

    $(document).on('click', '.to-top-btn', function(event) {
        event.stopPropagation();

        $('html, body').animate({scrollTop: 0}, 500);
    });

    $(document).on('click', '.num-page-btn', function (event) {
        event.stopPropagation();

        var quantityPage = parseInt($(this).closest("table").find(".quantity-page").text());
        if (quantityPage == 1) {
            return
        }

        var numPageClick = parseInt($(this).text());
        if (numPageClick > quantityPage) {
            return
        }
        
        var currentPage = parseInt($(this).siblings(".active-page-button").text());
        if (numPageClick === currentPage) {
            return;
        }

        if (quantityPage <= 3 || numPageClick === 1 || numPageClick === quantityPage) {
            $(this).siblings("button").removeClass("active-page-button").addClass("pagination-button");
            $(this).removeClass("pagination-button").addClass("active-page-button");
        } else {
            var prevNum = numPageClick - 1;
            var nextNum = numPageClick + 1;
            
            $(this).closest(".pagination-button-container").find(".num-page-btn").each(function(index) {
                if (index === 0) {
                    $(this).text(prevNum).removeClass("active-page-button").addClass("pagination-button");
                } else if (index === 1) {
                    $(this).text(numPageClick).removeClass("pagination-button").addClass("active-page-button");
                } else {
                    $(this).text(nextNum).removeClass("active-page-button").addClass("pagination-button");
                }
            });
        }

        changePage($(this).closest("table"), numPageClick);
        $('html, body').animate({
            scrollTop: $(this).closest("table").offset().top - 50
        }, 'slow');
    });

    $(document).on('click', '.pre', function (event) {
        event.stopPropagation();

        var quantityPage = parseInt($(this).closest("table").find(".quantity-page").text());
        var currentPage = parseInt($(this).siblings(".active-page-button").text());
        if (quantityPage == 1 || currentPage == 1) {
            return
        }

        if (currentPage == 2) {
            $(this).closest(".pagination-button-container").find(".num-page-btn").each(function(index) {
                if (index === 0) {
                    $(this).removeClass("pagination-button").addClass("active-page-button");
                } else if (index === 1) {
                    $(this).removeClass("active-page-button").addClass("pagination-button");
                } else {
                    $(this).removeClass("active-page-button").addClass("pagination-button");
                }
            });
        } else {
            $(this).closest(".pagination-button-container").find(".num-page-btn").each(function(index) {
                if (index === 0) {
                    $(this).text(currentPage-2).removeClass("active-page-button").addClass("pagination-button");
                } else if (index === 1) {
                    $(this).text(currentPage-1).removeClass("pagination-button").addClass("active-page-button");
                } else {
                    $(this).text(currentPage).removeClass("active-page-button").addClass("pagination-button");
                }
            });
        }

        changePage($(this).closest("table"), currentPage - 1);
    });

    $(document).on('click', '.next', function (event) {
        event.stopPropagation();

        var quantityPage = parseInt($(this).closest("table").find(".quantity-page").text());
        var currentPage = parseInt($(this).siblings(".active-page-button").text());
        if (quantityPage == 1 || currentPage == quantityPage) {
            return
        }

        if (currentPage == quantityPage - 1 && quantityPage > 2) {
            $(this).closest(".pagination-button-container").find(".num-page-btn").each(function(index) {
                if (index === 0) {
                    $(this).removeClass("active-page-button").addClass("pagination-button");
                } else if (index === 1) {
                    $(this).removeClass("active-page-button").addClass("pagination-button");
                } else {
                    $(this).removeClass("pagination-button").addClass("active-page-button");
                }
            });
        } else {
            $(this).closest(".pagination-button-container").find(".num-page-btn").each(function(index) {
                if (index === 0) {
                    $(this).text(currentPage).removeClass("active-page-button").addClass("pagination-button");
                } else if (index === 1) {
                    $(this).text(currentPage+1).removeClass("pagination-button").addClass("active-page-button");
                } else {
                    $(this).text(currentPage+2).removeClass("active-page-button").addClass("pagination-button");
                }
            });
        }

        changePage($(this).closest("table"), currentPage + 1);
    });

    $(document).on('change', '#tableSelector', function() {
        var tableId = $(this).val();
        var tableOffset = $("#" + tableId).offset().top - 50; 
        $("html, body").animate({ scrollTop: tableOffset }, 500);
    });
    
    $('#search_form').submit(function(event){
        event.preventDefault();
        key = $('#search_form input[type="text"]').val().toLowerCase();
        search();
    });

    $(document).on('click', '.update-btn', function (event) {
        event.stopPropagation();

        
        const idRow = $(this).data('idrow');
        const $updateRow = $(this).closest('.row-table');
        const $table = $updateRow.closest('table');
        const idStyle = $table.attr("id").replace("table_", "");
        const style = styles[idStyle-1]

        fetch(`http://localhost:3030/api/row?idRow=${ idRow }`, {
            method: 'GET',
            headers: {
                'Content-Type' : 'application/json',
                "authorization" : token
            }
        })
        .then(response => {
            return response.json().then(data => {
                if (!response.ok) {
                    showNotification(data.message);
                    throw new Error('Network response was not ok');
                }
                return data;
            });
        })
        .then(result => {
            var data = result.data;
            var demoContents = data.demo.split('\n');
            var linkDemos = data.linkDemo.split('\n');

            var coreUpdateRowHTML = `
            <button class="Xbutton"><i class="fa-solid fa-xmark"></i></button>
            <div>
                <h3>Cập nhật</h3>
            </div>
            <div>
                <div>
                    <h3 class="website-name"></h3>
                </div>
                <div>
                    <div class="window-child-left">
                        <label for="adsPosition">Vị trí (*)</label>
                        <input type="text" name="" id="adsPosition">
                    </div>
                    <div class="window-child-right">
                        <label for="platform">Nền tảng</label>
                        <select name="" id="platform">
                            <option value="PC">PC</option>
                            <option value="Mobile">Mobile</option>
                            <option value="PC & Mobile">PC & Mobile</option>
                        </select>
                    </div>
                </div>
                <div>
                    <div>
                        <label for="dimensions">Kích thước (*)</label>
                        <textarea name="" id="dimensions" cols="30" rows="7"></textarea>
                    </div>
                </div>
                <div class="end-core">
                    <div class="demo-container">
                        <h3>DEMO (*)</h3>
                        <div>
                            <input type="text" class="content" placeholder="Content">
                            <i class="fa-solid fa-link"></i>
                            <input class="link-demo" type="text" placeholder="Link demo">
                        </div>
                        <button class="add-demo" title="Thêm demo"><i class="fa-solid fa-plus"></i></button>
                    </div>
                </div>
            </div>
            <button class="save-update-row" data-idstyle="${ idStyle }" data-idrow="${ idRow }">SAVE</button>
            `;
            $("body").children().not(".window, .notification").addClass("blur");
            $('.window').empty().append(coreUpdateRowHTML);
            $('.window .website-name').text(data.website);
            $(rowStyleNewWebsiteHTML[idStyle-1]).insertAfter('.end-core');

            $("#adsPosition").val(data.adsPosition);
            $("#dimensions").val(data.dimensions);
            $("#platform").val(data.platform);

            $(".demo-container .content").val(demoContents[0]);
            $(".demo-container .link-demo").val(linkDemos[0]);
            for (let i = 1; i < demoContents.length; i++) {
                var newElement = `
                    <div>
                        <input type="text" class="content" placeholder="Content" value="${demoContents[i]}">
                        <i class="fa-solid fa-link"></i>
                        <input class="link-demo" type="text" placeholder="Link demo" value="${linkDemos[i]}">
                        <button class="remove-demo" title="Loại bỏ demo này"><i class="fa-solid fa-xmark"></i></button>
                    </div>
                `;
                
                $(".add-demo").before(newElement);
            }

            $("#col1").val(data[`${style.col1}`]).trigger("input");
            $("#col2").val(data[`${style.col2}`]).trigger("input");
            $("#col3").val(data[`${style.col3}`]).trigger("input");
            $("#col4").val(data[`${style.col4}`]).trigger("input");
            $("#col5").val(data[`${style.col5}`]).trigger("input");

            $('.window').show();
        })
        .catch(error => {
            console.error('There was a problem with your fetch operation:', error);
        });
    
    });

    $(document).on('click', '.delete-btn', function (event) {
        event.stopPropagation();

        if (confirm('Confirm delete this row.')) {
            const idRow = $(this).data('idrow');
            const $deletedRow = $(this).closest('.row-table');
            const $table = $deletedRow.closest('table');

            fetch('http://localhost:3030/api/row', {
                method: 'DELETE',
                headers: {
                    'Content-Type' : 'application/json',
                    "authorization" : token
                },
                body: JSON.stringify({ idRow: idRow })
            })
            .then(response => {
                return response.json().then(data => {
                    if (!response.ok) {
                        showNotification(data.message);
                        throw new Error('Network response was not ok');
                    }
                    return data;
                });
            })
            .then(result => {
                var message = result.message;

                const $prevRow = $deletedRow.prev();
                const $nextRow = $deletedRow.next();
    
                if ($prevRow.hasClass('header-website') && ($nextRow.hasClass('header-website') || !$nextRow.length)) {
                    $prevRow.remove();
                }

                $deletedRow.remove();

                if ($table.find('.row-table').length === 0) {
                    $table.remove();
                }

                showNotification(message);
            })
            .catch(error => {
                console.error('There was a problem with your fetch operation:', error);
            });
        }
    });

    $(document).on('click', '.add-row', function(event) {
        event.stopPropagation();
    
        var idWebsite = $(this).data('idwebsite');
        var website = $(this).closest('.header-website').find('a').text();
        var idStyle = $(this).closest('.table').attr('id').replace("table_", "");

        $("body").children().not(".window, .notification").addClass("blur");

        $('.window').empty().append(rowStyleHTML[idStyle-1]);
        $('.save').attr('data-idwebsite', idWebsite);
        $('.window .website-name').text(website);
        $('.window').show();
    });

    $(document).on('click', '.add-row-new-website', function(event) {
        event.stopPropagation();

        $("body").children().not(".window, .notification").addClass("blur");

        let selectWebsiteHTML = ``;

        for (let i = 0; i < websites.length; i++) {
            selectWebsiteHTML += `<option value="${ websites[i].idWebsite }" data-idstyle="${ websites[i].idStyle }" data-website="${ websites[i].name }">${ websites[i].name }</option>`
        }

        var coreNewRowHTML = `
        <button class="Xbutton"><i class="fa-solid fa-xmark"></i></button>
        <div>
            <div class="select-table-to-add">
                <h3>Dữ liệu mới</>
            </div>
        </div>
        <div>
            <div>
                <div>
                    <label for="website">Website (*)</label>
                    <select id='website'>
                        ${ selectWebsiteHTML }
                    </select>
                </div>
            </div>
            <div>
                <div class="window-child-left">
                    <label for="adsPosition">Vị trí (*)</label>
                    <input type="text" name="" id="adsPosition">
                </div>
                <div class="window-child-right">
                    <label for="platform">Nền tảng</label>
                    <select name="" id="platform">
                        <option value="PC">PC</option>
                        <option value="Mobile">Mobile</option>
                        <option value="PC & Mobile">PC & Mobile</option>
                    </select>
                </div>
            </div>
            <div>
                <div>
                    <label for="dimensions">Kích thước (*)</label>
                    <textarea name="" id="dimensions" cols="30" rows="7"></textarea>
                </div>
            </div>
            <div class="end-core">
                <div class="demo-container">
                    <h3>DEMO (*)</h3>
                    <div>
                        <input type="text" class="content" placeholder="Content">
                        <i class="fa-solid fa-link"></i>
                        <input class="link-demo" type="text" placeholder="Link demo">
                    </div>
                    <button class="add-demo" title="Thêm demo"><i class="fa-solid fa-plus"></i></button>
                </div>
            </div>
            <div>
                <div class="window-child-left">
                    <label for="col1">Cách tính giá</label>
                    <select name="" id="col1">
                        <option value="Độc quyền ngày">Độc quyền ngày</option>
                        <option value="Độc quyền/tuần">Độc quyền/tuần</option>
                        <option value="Độc quyền/tháng">Độc quyền/tháng</option>
                        <option value="Chia sẻ 3/ngày">Chia sẻ 3/ngày</option>
                        <option value="Chia sẻ 5/ngày">Chia sẻ 5/ngày</option>
                        <option value="Chia sẻ 3/tuần">Chia sẻ 3/tuần</option>
                        <option value="Chia sẻ 5/tuần">Chia sẻ 5/tuần</option>
                    </select>
                </div>
                <div class="window-child-right">
                    <label for="col2">Trang chủ</label>
                    <input type="text" id="col2" class="price">
                </div>
            </div>
            <div>
                <div class="window-child-left">
                    <label for="col3">Roadblock Xuyên site (Độc quyền ngày)</label>
                    <input type="text" id="col3" class="price">
                </div>
                <div class="window-child-right">
                    <label for="col4">CTR Trung bình (%)</label>
                    <input type="text" id="col4" class="performance">
                </div>
            </div>
            <div>
                <div>
                    <label for="col5">Est. Traffic/Tuần/slot</label>
                    <input type="text" id="col5" class="performance">
                </div>
            </div>
        </div>
        <button class="save-new-website">SAVE</button>
        `;

        $('.window').empty().append(coreNewRowHTML);
        $('.window').show();
    });
});

// on window
$(document).ready(function() {
    $(document).on('click', '.Xbutton', function(event) {
        event.stopPropagation();

        if (!skipConfirm) {
            if (!confirm("Bạn muốn tắt cửa sổ này khi chưa lưu thay đổi ?")) {
                return
            }
        }
    
        $('.window').empty().hide();
        $("body").children().removeClass("blur");
    });

    $(document).on('input', '.price', function(event) {
        var inputValue = $(this).val();

        $(this).val(formatNumber(inputValue));
    });

    $(document).on('click', '.add-demo', function(event) {
        event.stopPropagation();

        var newElement = `
            <div>
                <input type="text" class="content" placeholder="Content">
                <i class="fa-solid fa-link"></i>
                <input class="link-demo" type="text" placeholder="Link demo">
                <button class="remove-demo" title="Loại bỏ demo này"><i class="fa-solid fa-xmark"></i></button>
            </div>
        `;
        
        $(this).before(newElement);
    });

    $(document).on('click', '.remove-demo', function(event) {
        event.stopPropagation();
        
        $(this).closest('div').remove();
    });

    $(document).on('click', '.save-update-row', function(event) {
        event.stopPropagation();

        if (!confirm('Lưu dữ liệu cập nhật')) {
            return
        }
        
        var $data = $(this).siblings('div');
    
        var idRow = $(this).data("idrow");
        var idStyle = $(this).data("idstyle");
        var adsPosition = $data.find('#adsPosition').val().trim();
        var dimensions = $data.find('#dimensions').val().trim();
        var platform = $data.find('#platform').val().trim();
        
        var col1 = getColumnData($data, '#col1') == "" ? null : getColumnData($data, '#col1');
        var col2 = getColumnData($data, '#col2') == "" ? null : getColumnData($data, '#col2');
        var col3 = getColumnData($data, '#col3') == "" ? null : getColumnData($data, '#col3');
        var col4 = getColumnData($data, '#col4') == "" ? null : getColumnData($data, '#col4');
        var col5 = getColumnData($data, '#col5') == "" ? null : getColumnData($data, '#col5');
    
        var demoContent = '';
        var linkDemo = '';
    
        let hasError = false;
        $data.find('.demo-container > div').each(function() {
            var content = $(this).find('.content').val().trim();
            var link = $(this).find('.link-demo').val().trim();
            if (content !== '' && link !== '') {
                if (!isValidURL(link)) {
                    $(this).find('.link-demo').addClass('warning-border');
                    hasError = true;
                }
                demoContent += content + '\n';
                linkDemo += link + '\n';
            }
        });
        if (hasError) {
            showNotification('Có đường dẫn không hợp lệ.');

            return;
        }
    
        if (adsPosition == '' || dimensions == '') {
            showNotification('Hãy điền các thông tin quan trọng');
            return
        }
    
        if (demoContent == '' || linkDemo == '') {
            showNotification('Hãy điền ít nhất một demo');
            return
        }
    
        var updateRow = {
            idStyle: idStyle,
            idRow: idRow,
            adsPosition: adsPosition,
            dimensions: dimensions,
            platform: platform,
            demo: demoContent.trim(),
            linkDemo: linkDemo.trim(),
            col1: col1,
            col2: col2,
            col3: col3,
            col4: col4,
            col5: col5 
        }
    
        updateRowDOM(updateRow);
    }); 

    $(document).on('click', '.save', function(event) {
        event.stopPropagation();

        var $data = $(this).siblings('div');
        var idWebsite = $(this).data('idwebsite');
    
        var idStyle = $data.attr('id').replace('window_style_', '');
        var website = $data.find('.website-name').text().trim().toLowerCase();
        var adsPosition = $data.find('#adsPosition').val().trim();
        var dimensions = $data.find('#dimensions').val().trim();
        var platform = $data.find('#platform').val().trim();
        
        var col1 = getColumnData($data, '#col1') == "" ? null : getColumnData($data, '#col1');
        var col2 = getColumnData($data, '#col2') == "" ? null : getColumnData($data, '#col2');
        var col3 = getColumnData($data, '#col3') == "" ? null : getColumnData($data, '#col3');
        var col4 = getColumnData($data, '#col4') == "" ? null : getColumnData($data, '#col4');
        var col5 = getColumnData($data, '#col5') == "" ? null : getColumnData($data, '#col5');
    
        var demoContent = '';
        var linkDemo = '';
    
        let hasError = false;
        $data.find('.demo-container > div').each(function() {
            var content = $(this).find('.content').val().trim();
            var link = $(this).find('.link-demo').val().trim();
            if (content !== '' && link !== '') {
                if (!isValidURL(link)) {
                    $(this).find('.link-demo').addClass('warning-border');
                    hasError = true;
                }
                demoContent += content + '\n';
                linkDemo += link + '\n';
            }
        });
        if (hasError) {
            showNotification('Có đường dẫn không hợp lệ.');

            return;
        }
    
        if (adsPosition == '' || dimensions == '') {
            showNotification('Hãy điền các thông tin quan trọng');
            return
        }
    
        if (demoContent == '' || linkDemo == '') {
            showNotification('Hãy điền ít nhất một demo');
            return
        }

        if (!confirm('Lưu dữ liệu mới')) {
            return
        }
        
        
    
        var newRow = {
            idStyle: idStyle,
            idWebsite: idWebsite,
            website: website,
            adsPosition: adsPosition,
            dimensions: dimensions,
            platform: platform,
            demo: demoContent.trim(),
            linkDemo: linkDemo.trim(),
            col1: col1,
            col2: col2,
            col3: col3,
            col4: col4,
            col5: col5 
        }
    
        creatNewRow(newRow);
    }); 

    $(document).on('change', '#website', function(){
        var selectedOption = $(this).find('option:selected');
        var idStyle = selectedOption.data('idstyle');
        var index = idStyle - 1;

        $('.end-core').nextAll().remove();
        $(rowStyleNewWebsiteHTML[index]).insertAfter('.end-core');
    });

    $(document).on('click', '.save-new-website', function(event) {
        event.stopPropagation();

        if (!confirm('Lưu dữ liệu mới')) {
            return
        }
        
        var $data = $(this).siblings('div');
        
        var idWebsite = $('#website').val();
        var website = $('#website option:selected').data('website');
        var idStyle = $('#website option:selected').data('idstyle');
        var adsPosition = $('#adsPosition').val();
        var dimensions = $('#dimensions').val();
        var platform = $('#platform').val();

        var col1 = getColumnData($data, '#col1') == "" ? null : getColumnData($data, '#col1');
        var col2 = getColumnData($data, '#col2') == "" ? null : getColumnData($data, '#col2');
        var col3 = getColumnData($data, '#col3') == "" ? null : getColumnData($data, '#col3');
        var col4 = getColumnData($data, '#col4') == "" ? null : getColumnData($data, '#col4');
        var col5 = getColumnData($data, '#col5') == "" ? null : getColumnData($data, '#col5');
        
        var demoContent = '';
        var linkDemo = '';
        
        let hasError = false;
        $data.find('.demo-container > div').each(function() {
            var content = $(this).find('.content').val().trim();
            var link = $(this).find('.link-demo').val().trim();
            if (content !== '' && link !== '') {
                if (!isValidURL(link)) {
                    $(this).find('.link-demo').addClass('warning-border');
                    hasError = true;
                }
                demoContent += content + '\n';
                linkDemo += link + '\n';
            }
        });
        if (hasError) {
            showNotification('Có đường dẫn không hợp lệ.');

            return;
        }
    
        if (adsPosition == '' || dimensions == '' || idWebsite == '') {
            showNotification('Hãy điền các thông tin quan trọng');
            return
        }
    
        if (demoContent == '' || linkDemo == '') {
            showNotification('Hãy điền ít nhất một demo');
            return
        }
    
        var newRow = {
            idStyle: idStyle,
            website: website,
            idWebsite: idWebsite,
            adsPosition: adsPosition,
            dimensions: dimensions,
            platform: platform,
            demo: demoContent.trim(),
            linkDemo: linkDemo.trim(),
            col1: col1,
            col2: col2,
            col3: col3,
            col4: col4,
            col5: col5 
        }
        
        creatNewRow(newRow);
    });

    $(document).on('input', '#min_price', function() {
        var minPriceInput = parseInt($(this).val().replace(/\s/g, ''), 10);
        if ($(this).val() == '') {
            minPriceInput = 0;
        }
        if (!isNaN(minPriceInput)) {
            minPrice = minPriceInput;
        }
    });

    $(document).on('input', '#max_price', function() {
        var maxPriceInput = parseInt($(this).val().replace(/\s/g, ''), 10);
        if ($(this).val() == '') {
            maxPriceInput = 10000000000;
        }
        if (!isNaN(maxPriceInput)) {
            maxPrice = maxPriceInput;
        }
    });
});

function showData(data, style, quantityPage) {
    if (!data.length) {
        return;
    }

    var headerTableHTML = `
        <tr class="header-table" id="header_table_${ style.idStyle }">
            <th class="adsPosition">Vị trí</th>
            <th class="dimensions">Kích thước</th>
            <th class="platform">Nền tảng</th>
            <th class="demo">Demo</th>
            <th class="col1">${ style.detailCol1 }</th>
            <th class="col2">${ style.detailCol2 }</th>
            <th class="col3">${ style.detailCol3 }</th>
            <th class="col4">${ style.detailCol4 }</th>
            <th class="col5">${ style.detailCol5 }</th>
            <th class="action">Thao tác</th> 
        </tr>
    `;

    var footTableHTML = `
        <tr>    
            <td colspan="10">
                <div class="pagination-container">
                    <div class="pagination-button-container">
                        <button class="pagination-button pre"><i class="fa-solid fa-chevron-left"></i></button>
                        <button class="num-page-btn active-page-button">1</button>
                        <button class="num-page-btn pagination-button">2</button>
                        <button class="num-page-btn pagination-button">3</button>
                        <button class="pagination-button next"><i class="fa-solid fa-chevron-right"></i></button>
                    </div>
                    <form class="input-page">
                        <input type="text">
                        / <span class="quantity-page">${ quantityPage }</span> page
                        <button>Go</button>
                    </form>
                </div>
            </td>
        </tr>
    `;

    $(`#table_${ style.idStyle } thead`).append(headerTableHTML);

    $(`#table_${ style.idStyle } tfoot`).append(footTableHTML);

    var currentWebsite = "";

    for (let i = 0; i < data.length; i++) {
        if (data[i].website != currentWebsite) {            
            currentWebsite = data[i].website;

            var headerWebsiteHTML = `
                <tr class="header-website" id="header_website_${ data[i].idWebsite }">
                    <th colspan="10"><a href="${ data[i].url }" target="_blank" rel="noopener noreferrer" title="${ data[i].url }">${ data[i].website.toUpperCase() }</a>  <button class="add-row" data-idwebsite="${ data[i].idWebsite }" title="Thêm mới"><i class="fa-solid fa-plus"></i></button></th>
                </tr>
            `;
            $(`#table_${ style.idStyle } tbody`).append(headerWebsiteHTML);
        }

        var demos = data[i].demo.split('\n');
        var links = data[i].linkDemo.split('\n');
        var setDemo = "";
        for (let j = 0; j < demos.length; j++) {
            setDemo += `
                <div class="linkdemo"><a href="${ links[j] }" target="_blank" rel="noopener noreferrer">${ demos[j] }</a></div>
            `;
        }

        let deleteBtnHTML = (user_role == 'super_admin' ? `<button type="button" class="delete-btn" title="Xóa" data-idRow="${ data[i].idRow }"><i class="fa-solid fa-trash"></i></button>` : '')
        var row = `
        <tr class="row-table" id="row_${ data[i].idRow }" title="Tạo lúc ${ formatDatetime(data[i].created_at) } bởi ${ data[i].creator_username } ${ data[i].updated_at ? ("và cập nhật gần nhất lúc " + formatDatetime(data[i].updated_at) + " bởi " + data[i].updater_username) : "" }">
            <td class="adsPosition">${ data[i].adsPosition }</td>
            <td class="dimensions">${ data[i].dimensions }</td>
            <td class="platform">${ data[i].platform }</td>
            <td class="demo"><div>${ setDemo }</div></td>
            <td class="col1">${ data[i][style.col1] ? numterToString(data[i][style.col1]) : "" }</td>
            <td class="col2">${ data[i][style.col2] ? numterToString(data[i][style.col2]) : "" }</td>
            <td class="col3">${ data[i][style.col3] ? numterToString(data[i][style.col3]) : "" }</td>
            <td class="col4">${ data[i][style.col4] ? numterToString(data[i][style.col4]) : "" }</td>
            <td class="col5">${ data[i][style.col5] ? numterToString(data[i][style.col5]) : "" }</td>
            <td class="action">
                <div class="action-container">
                    <button type="button" class="update-btn" title="Chỉnh sửa" data-idRow="${ data[i].idRow }"><i class="fa-solid fa-pen"></i></button>
                    ${ deleteBtnHTML }
                </div>
            </td>
        </tr>
        `;
        $(`#table_${ style.idStyle } tbody`).append(row);
    
    }
}

function search () {
    $(".table").each(function() {
        $(this).find("thead").empty();
        $(this).find("tbody").empty();
        $(this).find("tfoot").empty();
    });

    for (let i = 0; i < styles.length; i++) {
        fetch(`http://localhost:3030/api/rows-style?idStyle=${ styles[i].idStyle }&key=${ encodeURIComponent(key) }&minPrice=${ minPrice }&maxPrice=${ maxPrice }&page=1`, {
            method: "GET",
            headers: {
                "Content-Type" : "application/json",
                "authorization" : token
            }
        })
        .then(response => {
            return response.json().then(data => {
                if (!response.ok) {
                    showNotification(data.message);
                    throw new Error('Network response was not ok');
                }
                return data;
            });
        })
        .then(result => {
            var data = result.data;
            var quantityPage = result.quantityPage
            showData(data, styles[i], quantityPage);
        })
        .catch(error => {
            console.error('There was a problem with your fetch operation:', error);
        });
    }
}

function changePage (table, page) {

    var idStyle = table.attr('id').replace("table_", "");

    table.find("tbody").empty();
    fetch(`http://localhost:3030/api/rows-style?idStyle=${ idStyle }&key=${ encodeURIComponent(key) }&page=${ page }&minPrice=${ minPrice }&maxPrice=${ maxPrice }`, {
            method: "GET",
            headers: {
                "Content-Type" : "application/json",
                "authorization" : token
            }
        })
        .then(response => {
            return response.json().then(data => {
                if (!response.ok) {
                    showNotification(data.message);
                    throw new Error('Network response was not ok');
                }
                return data;
            });
        })
        .then(result => {
            var data = result.data;

            var currentWebsite = "";
            var style = styles[idStyle-1]

            for (let i = 0; i < data.length; i++) {
                if (data[i].website != currentWebsite) {            
                    currentWebsite = data[i].website;
        
                    var headerWebsiteHTML = `
                        <tr class="header-website" id="header_website_${ data[i].idWebsite }">
                            <th colspan="10"><a href="${ data[i].url }" target="_blank" rel="noopener noreferrer" title="${ data[i].url }">${ data[i].website.toUpperCase() }</a>  <button class="add-row" data-idwebsite="${ data[i].idWebsite }" title="Thêm mới"><i class="fa-solid fa-plus"></i></button></th>
                        </tr>
                    `;
                    $(`#table_${ style.idStyle } tbody`).append(headerWebsiteHTML);
                }
        
                var demos = data[i].demo.split('\n');
                var links = data[i].linkDemo.split('\n');
                var setDemo = "";
                for (let j = 0; j < demos.length; j++) {
                    setDemo += `
                        <div class="linkdemo"><a href="${ links[j] }" target="_blank" rel="noopener noreferrer">${ demos[j] }</a></div>
                    `;
                }
        
                let deleteBtnHTML = (user_role == 'super_admin' ? `<button type="button" class="delete-btn" title="Xóa" data-idRow="${ data[i].idRow }"><i class="fa-solid fa-trash"></i></button>` : '')

                var row = `
                <tr class="row-table" id="row_${ data[i].idRow }" title="Tạo lúc ${ formatDatetime(data[i].created_at) } bởi ${ data[i].creator_username } ${ data[i].updated_at ? ("và cập nhật gần nhất lúc " + formatDatetime(data[i].updated_at) + " bởi " + data[i].updater_username) : "" }">
                    <td class="adsPosition">${ data[i].adsPosition }</td>
                    <td class="dimensions">${ data[i].dimensions }</td>
                    <td class="platform">${ data[i].platform }</td>
                    <td class="demo"><div>${ setDemo }</div></td>
                    <td class="col1">${ data[i][style.col1] ? numterToString(data[i][style.col1]) : "" }</td>
                    <td class="col2">${ data[i][style.col2] ? numterToString(data[i][style.col2]) : "" }</td>
                    <td class="col3">${ data[i][style.col3] ? numterToString(data[i][style.col3]) : "" }</td>
                    <td class="col4">${ data[i][style.col4] ? numterToString(data[i][style.col4]) : "" }</td>
                    <td class="col5">${ data[i][style.col5] ? numterToString(data[i][style.col5]) : "" }</td>
                    <td class="action">
                        <div class="action-container">
                            <button type="button" class="update-btn" title="Chỉnh sửa" data-idRow="${ data[i].idRow }"><i class="fa-solid fa-pen"></i></button>
                            ${ deleteBtnHTML }
                        </div>
                    </td>
                </tr>
                `;
                $(`#table_${ idStyle } tbody`).append(row);
            
            }
        })
        .catch(error => {
            console.error('There was a problem with your fetch operation:', error);
        });
}

function getColumnData($container, columnSelector) {
    var columnData = $container.find(columnSelector).val().trim();
    if (columnData !== '' && $container.find(columnSelector).hasClass('price')) {
        columnData = columnData.replace(/\s+/g, '').replace(/[.,]/g, ''); 
    }
    return columnData;
}

function creatNewRow (newRow) {
    fetch('http://localhost:3030/api/row', {
        method: "POST",
        headers: {
            "Content-Type" : "application/json",
            "authorization" : token
        },
        body:JSON.stringify(newRow)
    })
    .then(response => {
        return response.json().then(data => {
            if (!response.ok) {
                showNotification(data.message);
                throw new Error('Network response was not ok');
            }
            return data;
        });
    })
    .then(result => {
        showNotification(result.message);

        skipConfirm = true;
        $('.Xbutton').click();
        skipConfirm = false;
    
        var demos = newRow.demo.split('\n');
        var links = newRow.linkDemo.split('\n');
        var setDemo = "";
        for (let j = 0; j < demos.length; j++) {
            setDemo += `
                <div class="linkdemo"><a href="${ links[j] }" target="_blank" rel="noopener noreferrer">${ demos[j] }</a></div>
            `;
        }

        let deleteBtnHTML = (user_role == 'super_admin' ? `<button type="button" class="delete-btn" title="Xóa" data-idRow="${ result.idNewRow }"><i class="fa-solid fa-trash"></i></button>` : '')

        var newRowHTML = `
        <tr class="row-table new-row highlight-green" id="row_${ result.idNewRow }" title="Tạo lúc ${ formatDatetime(result.created_at) } bởi ${ result.creator_username }">
            <td class="adsPosition">${newRow.adsPosition}</td>
            <td class="dimensions">${newRow.dimensions}</td>
            <td class="platform">${newRow.platform}</td>
            <td class="demo"><div>${ setDemo }</div></td>
            <td class="col1">${newRow.col1 ? numterToString(newRow.col1) : ""}</td>
            <td class="col2">${newRow.col2 ? numterToString(newRow.col2) : ""}</td>
            <td class="col3">${newRow.col3 ? numterToString(newRow.col3) : ""}</td>
            <td class="col4">${newRow.col4 ? numterToString(newRow.col4) : ""}</td>
            <td class="col5">${newRow.col5 ? numterToString(newRow.col5) : ""}</td>
            <td class="action">
                <div class="action-container">
                    <button type="button" class="update-btn" title="Chỉnh sửa" data-idRow="${ result.idRow }"><i class="fa-solid fa-pen"></i></button>
                    ${ deleteBtnHTML }
                </div>
            </td>
        </tr>
        `;

        var style = styles[newRow.idStyle - 1];

        // kiểm tra bảng đã hiển thị trước đó chưa
        var theadTableContent = $(`#table_${ newRow.idStyle } thead`).html();
        if (!theadTableContent) {
            var headerTableHTML = `
            <tr class="header-table" id="header_table_${ style.idStyle }">
                <th class="adsPosition">Vị trí</th>
                <th class="dimensions">Kích thước</th>
                <th class="platform">Nền tảng</th>
                <th class="demo">Demo</th>
                <th class="col1">${ style.detailCol1 }</th>
                <th class="col2">${ style.detailCol2 }</th>
                <th class="col3">${ style.detailCol3 }</th>
                <th class="col4">${ style.detailCol4 }</th>
                <th class="col5">${ style.detailCol5 }</th>
                <th class="action">Thao tác</th> 
            </tr>
            `;
            var footTableHTML = `
            <tr>    
                <td colspan="10">
                    <div class="pagination-container">
                        <div class="pagination-button-container">
                            <button class="pagination-button pre"><i class="fa-solid fa-chevron-left"></i></button>
                            <button class="num-page-btn active-page-button">1</button>
                            <button class="num-page-btn pagination-button">2</button>
                            <button class="num-page-btn pagination-button">3</button>
                            <button class="pagination-button next"><i class="fa-solid fa-chevron-right"></i></button>
                        </div>
                        <form class="input-page">
                            <input type="text">
                            / <span class="quantity-page">1</span> page
                            <button>Go</button>
                        </form>
                    </div>
                </td>
            </tr>
            `;

            $(`#table_${ style.idStyle } thead`).append(headerTableHTML);

            $(`#table_${ style.idStyle } tfoot`).append(footTableHTML);
        }


        //kiểm tra có header-web chưa
        var headerWesitebContent =  $(`#header_web_${ newRow.idWebsite }`);
        if (!headerWesitebContent.length) {
            var headerWebsiteHTML = `
                <tr class="header-website" id="header_website_${ newRow.idWebsite }">
                    <th colspan="10"><a href="${ newRow.url }" target="_blank" rel="noopener noreferrer" title="${ newRow.url }">${ newRow.website.toUpperCase() }</a>  <button class="add-row" data-idwebsite="${ newRow.idWebsite }" title="Thêm mới"><i class="fa-solid fa-plus"></i></button></th>
                </tr>
            `;
            $(`#table_${ style.idStyle } tbody`).append(headerWebsiteHTML);
        }

        // validate
        $(newRowHTML).insertAfter(`#header_website_${ newRow.idWebsite }`); 

        var newPosition = $('.new-row').offset().top - 100;

        $('html, body').animate({ scrollTop: newPosition }, 1000, function() {
            setTimeout(function() {
                $('.new-row').removeClass('highlight-green new-row');
            }, 2000); 
        });
    
    })
    .catch(error => {
        console.error('There was a problem with your fetch operation:', error);
    });

}

function updateRowDOM (updateRow) {
    fetch('http://localhost:3030/api/row', {
        method: "PUT",
        headers: {
            "Content-Type" : "application/json",
            "authorization" : token
        },
        body:JSON.stringify(updateRow)
    })
    .then(response => {
        return response.json().then(data => {
            if (!response.ok) {
                showNotification(data.message);
                throw new Error('Network response was not ok');
            }
            return data;
        });
    })
    .then(result => {
        showNotification(result.message);

        skipConfirm = true;
        $('.Xbutton').click();
        skipConfirm = false;
    
        var demos = updateRow.demo.split('\n');
        var links = updateRow.linkDemo.split('\n');
        var setDemo = "";
        for (let j = 0; j < demos.length; j++) {
            setDemo += `
                <div class="linkdemo"><a href="${ links[j] }" target="_blank" rel="noopener noreferrer">${ demos[j] }</a></div>
            `;
        }

        let deleteBtnHTML = (user_role == 'super_admin' ? `<button type="button" class="delete-btn" title="Xóa" data-idRow="${ updateRow.idNewRow }"><i class="fa-solid fa-trash"></i></button>` : '')

        var bodyUpdateRowHTML = `
        <td class="adsPosition">${updateRow.adsPosition}</td>
        <td class="dimensions">${updateRow.dimensions}</td>
        <td class="platform">${updateRow.platform}</td>
        <td class="demo"><div>${ setDemo }</div></td>
        <td class="col1">${updateRow.col1 ? numterToString(updateRow.col1) : ""}</td>
        <td class="col2">${updateRow.col2 ? numterToString(updateRow.col2) : ""}</td>
        <td class="col3">${updateRow.col3 ? numterToString(updateRow.col3) : ""}</td>
        <td class="col4">${updateRow.col4 ? numterToString(updateRow.col4) : ""}</td>
        <td class="col5">${updateRow.col5 ? numterToString(updateRow.col5) : ""}</td>
        <td class="action">
            <div class="action-container">
                <button type="button" class="update-btn" title="Chỉnh sửa" data-idRow="${ updateRow.idRow }"><i class="fa-solid fa-pen"></i></button>
                ${ deleteBtnHTML }
            </div>
        </td>
        `;

        // validate
        $(`#row_${ updateRow.idRow }`).empty().append(bodyUpdateRowHTML);
        var newTitle = `Tạo lúc ${ formatDatetime(result.created_at) } bởi ${ result.creator_username } ${ result.updated_at ? ("và cập nhật gần nhất lúc " + formatDatetime(result.updated_at) + " bởi " + result.updater_username) : "" }`;
        $(`#row_${updateRow.idRow}`).attr('title', newTitle);
        $(`#row_${ updateRow.idRow }`).addClass('highlight-yellow');

        var newPosition = $(`#row_${ updateRow.idRow }`).offset().top - 100;

        $('html, body').animate({ scrollTop: newPosition }, 1000, function() {
            setTimeout(function() {
                $(`#row_${ updateRow.idRow }`).removeClass('highlight-yellow');
            }, 2000); 
        });
    
    })
    .catch(error => {
        console.error('There was a problem with your fetch operation:', error);
    });
}

function formatDatetime (datetime) {
    const dateTime = new Date(datetime);
    const date = dateTime.toLocaleDateString();
    const time = dateTime.toLocaleTimeString();

    return time + " " + date;
}