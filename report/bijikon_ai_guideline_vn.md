---
# pandoc bijikon_ai_guideline_vn.md -o pdf/bijikon_ai_guideline_vi.pdf --from markdown --template /home/vmodev/.local/share/pandoc/templates/eisvogel.tex --listings --pdf-engine=xelatex --toc --number-sections

papersize: a4
lang: vi-VN
# geometry:
#     - top=30mm
#     - left=20mm
#     - right=20mm
#     - heightrounded
documentclass: article
title: Bijikon AI guideline
author: VMO Holdings .Jsc
date: 20-01-2021
titlepage: true
toc-own-page: true
logo: images/vmo.png
header-includes: 
      - |
        ``` {=latex}
        \let\originAlParaGraph\paragraph
        \renewcommand{\paragraph}[1]{\originAlParaGraph{#1} \hfill}
        ```
...

# Tổng quan về công nghệ sử dụng

## LightFM

ggLightFM là 1 thư viện về hệ thống gợi ý. LightFM sử dụng một phương pháp phổ biến hiện tại là Neighborhood base collaborative filtering. Phương pháp này sẽ nhìn điểm tương đồng giữa các haichi và taiin để gợi ý cho việc matching. Cụ thể về cách hoạt động sẽ được làm rõ hơn trong phần AI guideline.

## Pandas
Pandas dùng để phân tích và quản lý dữ liệu. Dữ liệu của bijikon sẽ được lọc và làm sạch bằng pandas trước khi được đưa vào LightFm để phân tích bằng machine learning.




# Tổng quan về hệ thống gợi ý

Các bạn có lẽ đã gặp những hiện tượng này nhiều lần:

- Youtube tự động chuyển các clip liên quan đến clip bạn đang xem. Youtube cũng tự gợi ý những clip mà có thể bạn sẽ thích.

- Facebook hiển thị quảng cáo những sản phẩm có liên quan đến từ khoá bạn vừa tìm kiếm.

- Facebook gợi ý kết bạn.

- Netflix tự động gợi ý phim cho người dùng.

Và rất nhiều ví dụ khác mà hệ thống có khả năng tự động gợi ý cho ngừời dùng những sản phẩm họ có thể thích. Bằng cách quảng cáo hướng đúng đội tượng như thế này, hiệu quả của việc marketing cũng sẽ tăng lên. Những thuật toán đằng sau những ứng dụng này là những thuật toán Machine Learning có tên gọi chung là Recommender Systems hoặc Recommendation Systems, tức Hệ thống gợi ý.

Các Recommendation Systems thường được chia thành hai nhóm lớn:

- Content-based systems
- Collaborative filtering

Dự án Bijikon sử dụng phương pháp collaborative filtering. Content-based systems có 2 nhược điểm không phù hợp với dự án. Thứ nhất, khi xây dựng mô hình cho một user, các hệ thống Content-based không tận dụng được thông tin từ các users khác. Thứ hai, các Haichi không phải lúc nào cũng có đánh giá cho mỗi Taiin từng được sử dụng.

Điều này dẫn tới việc sử dụng Collaborative filtering là phù hợp.


# Cấu trúc dự án

```
-> ai/
	->data/
		->raw/
		->origin/
		->backup/
	->out/
	->src/
		->lib/
	->api.py
	->library_needed.txt

```

- data/

Thư mục data chứa 3 folder, raw/, origin/ và backup/. Sau khi được upload, 13 file dữ liệu sẽ được đặt trong thư mục origin/. Dữ liệu trong thư mục origin hoàn toàn chưa được qua xử lý. Sau khi được xử lý để đồng bộ kiểu dũ liệu, thông tin 13 file sau đó sẽ được để trong mục raw/.

Thư mục backup/ dùng để sao lưu dữ liệu của các ngày sau khi xử lý. Trong thư mục backup, dữ liệu mỗi ngày sẽ được để trong 1 folder có định dạng như sau:

```
->backup/
	...
	->20210125
	->20210126
	...
```

- out/

Thư mục này chưa file kansei.csv, là file output chứa dữ liệu đã được dự đoán.

- src/

Thư mục này chưa source code chính của mô hình machine learning.

- api.py

File này sẽ được Django gọi để trả kết quả cho phần web.

- requirements.txt

File này danh sách các dependancy được sử dụng bởi module AI. Bạn có thể xem thêm về cách sử dụng file này trong mục Cách tạo môi trường cho server.

# API

```
Reserve HERE FOR API
```

# Cấu trúc hàm

Module AI được chia thành 3 step nhỏ.

- Tiền xử lý (Pre-processing)
- Huấn luyện mô hình (AI Training)
- Hậu xử lý (Post-processing)


## Tiền xử lý

```
def data_cleaning()
```

Tiền xử lý là một bước rất quan trọng trong việc huấn luyện bất kì mô hình học máy nào. Dữ liệu trước khi đưa vào hệ thống AI để huấn luyện cần phải được làm sạch. Đối với dự án Bijikon, Sau khi nhận được 13 file dữ liệu đầu vào, dữ liệu sẽ được đi qua hàm ```data_cleaning()''' Hàm '''data_cleaning()''' sẽ được chia ra làm những hàm nhỏ hơn phục vụ những mục đích cụ thể. Những hàm nhỏ sẽ được liệt kê ở dưới.

- Check ngày nghỉ của taiin.

```
def holiday_check()
```


|            	| Variable                                 		| Format           	|
|------------	|------------------------------------------		|------------------	|
| Parameters 	| m_taiin, taiin_holiday,  taiin_holiday_nego 	| Pandas Dataframe 	|
| Output     	| preprocessed_m_taiin                     		| Pandas Dataframe 	|


Đầu ra là ```preprocessed_m_taiin``` đã được làm sạch ngày nghỉ.

- Check số ngày làm việc của taiin.



```
def num_work_check()
```

|            	| Variable                                     	| Format           	|
|------------	|----------------------------------------------	|------------------	|
| Parameters 	| preprocessed_m_taiin, taisho, kansan, kansei 	| Pandas Dataframe 	|
| Output     	| preprocessed_m_taiin                         	| Pandas Dataframe 	|

```preprocessed_m_taiin``` trong parameters là đầu ra của ```holiday_check()```.

- Check taiin được chỉ định.

```
def designated_check()
```

|            	| Variable                                                       	| Format           	|
|------------	|----------------------------------------------------------------	|------------------	|
| Parameters 	| preprocessed_m_taiin, m_haichi, kansei                         	| Pandas Dataframe 	|
| Output     	| preprocessed_m_taiin, kansei_temp_designated, processed_kansei 	| Pandas Dataframe 	|

```preprocessed_m_taiin``` trong parameters là đầu ra của ```num_work_check()```.

```kansei_temp_designated``` là bảng chứa những mã kansei **đã được match** sau ```num_work_check()```.

```processed_kansei``` là bảng chứa những mã kansei **chưa được match** sau ```num_work_check()```.

- Match ưu tiên những taiin đã được match với haichi hôm trước.

```
def priority_kyoshi()
```

|            	| Variable                                                                 	| Format           	|
|------------	|--------------------------------------------------------------------------	|------------------	|
| Parameters 	| preprocessed_m_taiin, m_haichi, taisho, processed_kansei, kansei_kyoshi 	| Pandas Dataframe 	|
| Output     	| preprocessed_m_taiin, kansei_temp_priority_kyoshi, processed_kansei      	| Pandas Dataframe 	|

```preprocessed_m_taiin``` và ```processed_kansei``` trong parameters là đầu ra của ```designated_check()```.

```kansei_temp_priority_kyoshi``` là bảng chứa những mã kansei **đã được match** sau ```priority_kyoshi()```.

```processed_kansei``` là bảng chứa những mã kansei **chưa được match** sau ```priority_kyoshi()```.


- Kiểm tra priority on site work.

```
def priority_on_site_work_check()
```

|            	| Variable                                                 	| Format           	|
|------------	|----------------------------------------------------------	|------------------	|
| Parameters 	| preprocessed_m_taiin, m_haichi, taisho, processed_kansei 	| Pandas Dataframe 	|
| Output     	| preprocessed_m_taiin, kansei_temp_priority               	| Pandas Dataframe 	|

```preprocessed_m_taiin``` và ```processed_kansei``` trong parameters là đầu ra của ```priority_kyoshi()```.


```kansei_temp_priority``` là bảng chứa những mã kansei **đã được match** sau ```priority_on_site_work_check()```.


Sau khi hoàn tất bước preprocessing, hàm sẽ trả về ```preprocessed_m_taiin```, ```kansei_matched```, ```kansei_blank```.

1. ```preprocessed_m_taiin``` chứa toàn bộ những taiin chưa được match và loại bỏ những taiin không đủ điều kiện.

2. ```kansei_matched``` chứa những mã kansei đã được match sau khi pre-processing.

3. ```kansei_blank``` chứa những mã kansei chưa được match để match trong step ai traning.


## Huấn luyện mô hình 

### Tổng quan hệ thống về mặt toán học

Chúng ta có m_taiin được biểu diễn bởi $T$, Mỗi taiin được biểu diễn bởi vector $t_{i}$ và $T = \{t_{i},i\in[1,N]\}$. Mỗi vector $t_{i}$ được biểu diễn bởi các trường trong m_taiin như hình dưới.

![Vector taiin](images/ai_1.png)

Tương tự đối với haichi, ta có m_haichi được biểu diễn bởi $H$, Mỗi haichi được biểu diễn bởi vector $h_{j}$ và $H = \{h_{j},j\in[1,M]\}$. Mỗi vector $h_{j}$ được biểu diễn bởi các trường trong m_taiin như hình dưới.

![Vector haichi](images/ai_2.png)

Từ các tập $T$ và $H$ ta xây dựng được ma trận $A = \{a_{ij},|i\in[1,N],j\in[1,M]\}$ có kích thước $M * N$ thể hiện sự tương tác giữa các haichi và taiin.

![Relation matrix taiin - haichi](images/ai_3.png){ width=80% }

Giá trị của $a_{ij}$ được tính bằng cách so sánh các điều kiện của taiin $t_{i}$ và haichi $h_{j}$. $a_{ij}$ thể hiện sự tương tác giữa $t_{i}$ và $h_{j}$. Nếu các điều kiện bắt buộc không khớp nhau thì $a_{ij} = 0$, ngược lại $a_{ij}\ne 0$.

Với tùy từng feature $t_{i}$ và $h_{j}$ khớp nhau thì $a_{ij}$ sẽ được cộng điểm. Điểm số này có thể thay đổi phụ thuộc vào feature nào bạn coi là có sức nặng hơn.

Chúng ta sẽ dùng AI để tìm ra các taiin phù hợp nhất với haichi tương ứng. Ví dụ: nếu haichi = $h1$, và có nhu cầu cần 3 taiin , chúng ta sẽ lọc lấy taiin $t_{i}$ có rating cao nhất, sau đó dùng collaborative filtering để tìm 2 taiin $t_{j}$ và $t_{k}$ giống nhất với taiin $t_{i}$ vừa được chọn. 




### Tạo ma trận quan hệ giữa taiin và haichi

Đối với hệ thống gợi ý sử dụng collaborative filtering, chúng ta cần phải tạo ma trận quan hệ giữ taiin và haichi. Ma trận quan hệ giữa Haichi và taiin sẽ có những điểm số, dựa vào những thông tin có được từ bảng ```m_taiin``` và ```m_haichi```.


```
def matrix_factorization()
```

|            	| Variable                                   	| Format           	|
|------------	|--------------------------------------------	|------------------	|
| Parameters 	| haichi, preprocessed_m_taiin, kansei_blank 	| Pandas Dataframe 	|
| Output     	| matrix,  final_matrix, matrix_pivot        	| Pandas Dataframe 	|
|            	| final_matrix_scipy                         	| Scipy matrix     	|


```preprocessed_m_taiin```, ```kansei_blank``` trong parameters là đầu ra của ```data_cleaning()```.

### Lấy danh sách những taiin phù hợp với haichi nhất

```
def haichi_sorted_list():
```

|            	| Variable           	| Format           	|
|------------	|--------------------	|------------------	|
| Parameters 	| final_matrix       	| Pandas Dataframe 	|
| Output     	| haichi_taiin_array 	| Pandas Dataframe 	|

```final_matrix``` trong parameters là đầu ra của ```matrix_factorization()```.

Output sẽ chứa danh sách taiin theo haichi với điểm số phù hợp từ cao đến thấp.

### Xác định mức độ quan tâm của một haichi tới một taiin dựa trên các haichi khác gần giống với haichi này bằng machine learning sử dụng LightFM.

```
def ai_process()
```

|            	| Variable                                                                                    	| Format           	|
|------------	|---------------------------------------------------------------------------------------------	|------------------	|
| Parameters 	| m_taiin, m_haichi, taiin_holiday, taiin_holiday_nego, taisho, kansan, kansei, kansei_kyoshi 	| Pandas Dataframe 	|
| Output     	| kansei.csv in /out                                                                          	| Pandas Dataframe 	|



Hàm ```ai_process()``` sẽ sử dụng nhiều hàm nhỏ ở trên (bao gồm ```data_cleaning()``` và ```haichi_sorted_list()```) trước khi được training bằng ma trận điểm số đã được tạo ở hàm ```matrix_factorization()```.

Mô hình được huấn luyện dựa trên điểm số của ma trận sẽ có độ chính xác tăng dần do được học những dữ liệu được match của các ngày trước đó.

## Hậu xử lý


```
def check_abi()
```
Kiểm tra điểm trình độ của taiin theo yêu cầu của haichi. Mức điểm trugn bình trình độ của các taiin trong ngày hôm đó phải ```>=``` yêu cầu điểm trình độ của haichi.

```
def check_age()
```
Kiểm tra giới hạn độ tuổi của taiin theo yêu cầu của haichi.

```
def check_insurance()
```
Kiểm tra yêu cầu bảo hiểm của haichi. Những taiin không có bảo hiểm sẽ không được ghép với haichi yêu cầu bảo hiểm.

```
def check_claim()
```
Loại bỏ những taiin đã bị haichi claim.

```
def check_good_to_have()
```
Kiểm tra điều kiện good to have. Những taiin có điều kiện này sẽ được ưu tiên match so với những taiin khác. Tuy nhiên, trong trường hợp match không đủ số lượng taiin thì những taiin không có những điều kiện trên vẫn sẽ được ghép cặp với haichi.

```
def check_kansei_taisho()
```
Kiểm tra nếu kansei không nằm trong file ```taisho```.

Đầu ra của bước này là những cặp kansei No - haichi - taiin đã được match

## Tạo file kết quả kansei

File kết quả kansei được tạo là các cặp  kansei No - haichi - taiin.

file kansei cuối cùng là ```kansei_temp_priority_kyoshi```, ```kansei_temp_designated``` và ```kansei_temp_priority_kyoshi``` của bước ```data_cleaning()``` và file kansei được dự đoán bởi bước ```ai_process()```.