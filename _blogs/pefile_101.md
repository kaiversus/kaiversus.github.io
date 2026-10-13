---
layout: blog
title: "pefile 101"
category: programming
subcategory: 
description: "Giới thiệu thư viện pefile và cách áp dụng nó vào tools phân tích tĩnh mã độc"
date: 2026-10-11 00:00:00
author: Kaiversus
difficulty: Intermediate
---

## Tổng quan về pefile 

`pefile` là một thư viện Python dùng để phân tích, truy xuất và thao tác với tệp định dạng PE trên Windows. 

Khả năng xử lý edge cases: `pefile` đã được kiểm thử với các file malware cũng như các file corrupted và malformed.

Quy tắc đặt tên thuộc tính:
- Các cấu trúc cơ bản của PE file được truy cập dưới dạng uppercase attribute và cùng tên với định nghĩa gốc (vd: DOS_HEADER,...).
- Các processed elements như Import Table, Export Table sử dụng lowercase để phân biệt (vd: sections,...)

## Module & Core Classes

### Module `pefile`

#### Khởi tạo và điều khiển trung tâm

- `PE(name=None, data=None, fast_load=None, max_symbol_exports=8192)`: class trung tâm đại diện cho toàn bộ PE
    - Nhận path của file `name` hoặc raw bytes `data`
    - Tham số `fast_load=None` biểu thị hành động tải nhanh các cấu trúc cơ bản mà không parse sâu bảng import/export
    - Giới hạn parse export thông qua tham số `max_symbol_exports`

- `PEFormatError`: exception văng ra mỗi khi file đưa vào bị lỗi hoặc sai cấu trúc chuẩn của file PE

#### Hai data class cốt lõi

- `Structure`: Lớp nền tảng ánh xạ cấu trúc nhị phân của PE thành đối tượng Python.

   *Trích xuất thông tin:*
    - `dump()`: trả về struct dưới dạng chuỗi văn bản có căn lề
    - `dump_dict()`: trả về struct dưới dạng Dictionary
    - `sizeof()`: kích thước của struct theo byte

    *Tra cứu vị trí và kiểm tr:*
    - `get_field_absolute_offset(field_name)` / `get_field_relative_offset(field_name)`: xác định vị trí offset tuyệt đối trong file và tương đối trong struct
    - `all_zeroes()`: kiểm tra xem toàn bộ data của struct có phải toàn bằng byte `0x00` hay không

- `SectionStructure`: class chuyên quản lý cho từng Section

    *Kiểm tra địa chỉ:*
    - `contains_rva(rva)` / `contains_offset(offset)`: xác định một địa chỉ RVA hoặc file offset có thuộc section này hay không

    *Hashing và phát hiện mã độc*
    - `get_entropy()` / `entropy_H(data)`: Tính toán **entropy** của dữ liệu section
    - `get_hash_md5()`, `get_hash_sha1()`, `get_hash_sha256()`, `get_hash_sha512()`: lấy hash code của section
    - `get_data(start=None, length=None)`: cắt và đọc chuỗi byte từ section theo địa chỉ ảo

#### Các `Data Containers`

| Thành phần PE | Container lớp cha | Container chi tiết từng mục | Dữ liệu tiêu biểu |
|---|---|---|---|
| Imports | `ImportDescData` | `ImportData` | DLL name, API function name, Ordinal, Address |
| Exports | `ExportDirData` | `ExportData` | Exported symbol, Function Address, Ordinal, Forwarder |
| Resources | `ResourceDirData` | `ResourceDirEntryData` / `ResourceDataEntryData` | Cây thư mục tài nguyên (icon, string, version info) |
| Relocations | `BaseRelocationData` | `RelocationData` | Bảng địa chỉ nạp lại (RVA, relocation type) |
| Khác | `DebugData`, `TlsData`, `LoadConfigData`, `BoundImportDescData` | — | Thông tin gỡ lỗi, bộ nhớ luồng (TLS), cấu hình nạp |

#### Utilities

- `Dump`: bộ gom và định dạng chuỗi để in ra console/log file
    - `add()`, `add_header()`, `add_line()`, `get_text()`

- `UnicodeStringWrapperPostProcessor`: xử lý và giải mã chuỗi ký tự đặc biệt trong binary

### Module `peutils`

#### Nhận diện chữ ký

`SignatureDatabase(filename=None, data=None)`: tải và quản lý cơ sở dữ liệu mẫu nhận diện của PEiD

#### Các hàm kiểm tra heuristic và dấu hiệu nghi vấn

- `peutils.is_probably_packed(pe)`: kiểm tra tệp có bị nén hay mã hóa hay không
- `peutils.is_suspicious(pe)`: kiểm tra tệp có hành vi cấu trúc đáng ngờ thường thấy ở malware không
- `peutils.is_valid(pe)`: kiểm  tra cấu trúc PE cơ bản có toàn vẹn và hợp lệ hay không

## Khởi tạo và Nạp PE file

**Cú pháp tổng quát:**

```python
import pefile

pe = pefile.PE(
    name=None,
    data=None,
    fast_load=None,
    max_symbol_exports=8192
)
```

### 3 cách nạp dữ liệu vào pefile

Truyền path trực tiếp:

```python
pe = pefile.PE('/path/to/pefile.exe')
```

Chỉ định rõ qua parameter `name`:

```python
pe = pefile.PE(name='module.dll')
```

Nạp từ Memory Buffer/ Raw Bytes:

```python
pe = pefile.PE(data=raw_pe_bytes)
```

### Cơ chế `fast_load`

Ở chế độ mặc định, pefile sẽ phân tích toàn bộ file PE:
- **Cách bật**: đặt tham số `fast_load=True` khi khởi tạo hoặc gán flag toàn cục `pefile.fast_load = True`
- **Cơ chế hoạt động**: thư viện chỉ parse phần Header cở bản từ DOS $\rightarrow$ NT và bỏ qua Data Directories
- **Mục đích**: tăng tốc độ xử lý khi chỉ cần load nhanh header cơ bản
- Cách nạp bù data sau khi fast_load: 
    - `pe.full_load()`: Nạp lại toàn bộ các cấu trúc còn lại
    - `pe.parse_data_directories()`: Nạp có chọn lọc các thư mục dữ liệu cụ thể

### Phân tích từng Data Directories (`parse_data_directories`)

```python
pe.parse_data_directories(
    directories=[
        pefile.DIRECTORY_ENTRY['IMAGE_DIRECTORY_ENTRY_IMPORT'],
        pefile.DIRECTORY_ENTRY['IMAGE_DIRECTORY_ENTRY_EXPORT'],
    ],
    forwarded_exports_only=False,
    import_dllnames_only=False,
)
```

- `directories`: Danh sách các Data Directory cần phân tích
- `forwarded_exports_only=True`: Chỉ parse các hàm export dạng chuyển tiếp
- `import_dllnames_only=True`: Chỉ trích xuất tên các tệp DLL được import, bỏ qua việc phân tích từng symbols/APIs để tiết kiệm thời gian.

## Truy cập Headers, Sections & Directories trong `pefile`

### Basic Headers

Mọi field trong cấu trúc gốc được định nghĩa trong file `WINNT.H` của Windows SDK đều được pefile ánh xạ hoàn toàn thành các thuộc tính python:
- `pe.DOS_HEADER`( `pe.DOS_HEADER.e_magic`,...)
- `pe.NT_HEADERS`
- `pe.FILE_HEADER` (`pe.FILE_HEADER.NumberOfSections`,...)
- `pe.OPTIONAL_HEADER` (`pe.OPTIONAL_HEADER.AddressOfEntryPoint`)
- `pe.header`: thuộc tính lưu trữ chuỗi raw byte tính từ byte đầu tiên của tệp (`offset 0`) cho đến vị trí bắt đầu của Section đầu tiên

### Sections

Tập hợp các section được lưu trong danh sách pe.sections. Mỗi phần tử đại diện cho Section Header:

```python
for section in pe.sections:
    name = section.Name.decode('utf-8', errors='ignore').rstrip('\x00')
    
    print(
        name,
        hex(section.VirtualAddress),    
        hex(section.Misc_VirtualSize),    
        section.SizeOfRawData          
    )
```
*Cơ chế Section Characteristics*

`pefile` tự động parse và gán các cờ chuẩn trong `WINNT.H`(ex: `IMAGE_SCN_MEM_EXECUTE`) thành thuộc tính boolean trực tiếp trên instance của section bằng các lược bỏ tiền tố `IMAGE_SCN_`

### Constant Mapping Directories

Trong `pefile`, các cấu trúc tra cứu hằng số bản chất là các **bi-directional dictionaries**, giúp map trực tiếp các raw field trong struct(DWORD/WORD) sang định danh chuẩn trong `WINNT.H`

#### File Structure & Header Flags
- `pefile.DIRECTORY_ENTRY`: Ánh xạ index của `IMAGE_DATA_DIRECTORY` (Export, Import, TLS...).
- `pefile.IMAGE_CHARACTERISTICS`: Ánh xạ các characteristic bitflags trong `IMAGE_FILE_HEADER` (`IMAGE_FILE_DLL`, `IMAGE_FILE_32BIT_MACHINE`...).
- `pefile.SECTION_CHARACTERISTICS`: Ánh xạ memory permissions và section flags (`IMAGE_SCN_MEM_EXECUTE`, `IMAGE_SCN_CNT_CODE`...).

#### Architecture & Runtime Context
- `pefile.MACHINE_TYPE`: Tra cứu target CPU architecture (`IMAGE_FILE_MACHINE_I386`, `IMAGE_FILE_MACHINE_AMD64`...).
- `pefile.SUBSYSTEM_TYPE`: Tra cứu Windows subsystem thực thi (`IMAGE_SUBSYSTEM_NATIVE`, `IMAGE_SUBSYSTEM_WINDOWS_GUI`...).
- `pefile.DEBUG_TYPE`: Tra cứu format của debug symbols (`IMAGE_DEBUG_TYPE_CODEVIEW`...).
- `pefile.RELOCATION_TYPE`: Kiểu base relocation entries dùng cho memory rebasing (`IMAGE_REL_BASED_HIGHLOW`...).

#### Resource Directory & Localization
- `pefile.RESOURCE_TYPE`: Resource type IDs trong .rsrc directory tree (`RT_ICON`, `RT_STRING`, `RT_MANIFEST`...).
- `pefile.LANG` & `pefile.SUBLANG`: Ánh xạ `LCID` và Sublanguage ID.

### Các hàm kiểm tra loại tệp nhanh

- `pe.is_exe()`: trả về `True` nếu có cờ `IMAGE_FILE_EXECUTABLE_IMAGE`
- `pe.is_dll()`: trả về `True` nếu file manh cờ `IMAGE_FILE_DLL`
- `pe.is_driver()`: trả về `True` nếu trường Subsystem là `IMAGE_SUBSYSTEM_NATIVE`hoặc các tiêu chí cấu trúc xác nhận tệp là Windows kernel driver `.sys`
- `pe.has_relocs()`: Trả về `True` nếu tệp có chứa thư mục `Base Relocation Directory`

### Data Directories

#### Import Directory `DIRECTORY_ENTRY_IMPORT`

Lưu trữ danh sách các DLL và hàm ngoại vi mà file PE sử dụng, biểu diễn qua danh sách các đối tượng `ImportDescData`

```python
for entry in pe.DIRECTORY_ENTRY_IMPORT:
    # Tên thư viện DLL
    print('DLL:', entry.dll.decode('utf-8'))
    
    # Danh sách các hàm được import từ DLL này
    for imp in entry.imports:
        print('\tAddress:', hex(imp.address), 'Name:', imp.name, 'Ordinal:', imp.ordinal)
```

#### Export Directory `DIRECTORY_ENTRY_EXPORT`

Chứa danh sách các hàm mà file PE cung cấp cho các module khác, biểu diễn qua đối tượng `ExportDirData`

```python
for exp in pe.DIRECTORY_ENTRY_EXPORT.symbols:
    # Tính địa chỉ thực tế (RVA + ImageBase)
    address = pe.OPTIONAL_HEADER.ImageBase + exp.address
    print('Address:', hex(address), 'Name:', exp.name, 'Ordinal:', exp.ordinal)
```

#### Resource Directory `DIRECTORY_ENTRY_RESOURCE`

Dữ liệu tài nguyên được phân cấp theo mô hình cây 3 tầng:

1. **Root Level**: cấu trúc `IMAGE_RESOURCE_DIRECTORY` quản lý danh sách các entry tài nguyên tổng thể

2. **Level 2**: phân nhánh và trỏ tới danh sách tài nguyên dựa theo `type` hoặc định danh (ID)

3. Level 3: cấu trúc `IMAGE_RESOURCE_DATA_ENTRY` trỏ trực tiếp đến vùng dữ liệu thực tế của tài nguyên trong file

#### Đọc Resource String `RT_STRING` - Type 6

Cấu trúc lưu trữ: String Table chia thành từng block, mỗi khối chứa 16 chuỗi theo định dạng Pascal-style (bắt đầu tiền tố 2-byte `WORD` chỉ định độ dài chuỗi Unicode)

Phương thức trích xuất: 
- `Automation`: Dùng hàm tích hợp sẵn `pe.get_resources_strings()`
- `Manual`: duyệt cây thư mục `DIRECTORY_ENTRY_RESOURCE` và lọc entry có ID là `RT_STRING` (giá trị số nguyên = 6)

#### Version Information `parse_version_information`

Hàm bóc tách metadata phiên bản và gán trực tiếp vào các thuộc tính của đối tượng PE:

`VS_VERSIONINFO`: Cấu trúc tiêu đề phiên bản, gồm các trường:
    -`Length`: Kích thước toàn bộ cấu trúc phiên bản.
    - `ValueLength`: Độ dài dữ liệu đi kèm.
    - `Type`: Kiểu dữ liệu (văn bản hoặc nhị phân).
- `VS_FIXEDFILEINFO`: Chứa thông số kỹ thuật cốt lõi của file:
    - `Signature`, `FileOS`, `FileType`, `FileFlags`.
    - **Phiên bản file**: FileVersionMS, FileVersionLS.
    - **Phiên bản sản phẩm**: ProductVersionMS, ProductVersionLS.
`FileInfo`: Chứa thông tin mô tả chi tiết:
    - `StringFileInfo`: Chứa các StringTable (dạng dictionary) lưu thông tin bản quyền, mô tả công ty, tên sản phẩm...
    - `VarFileInfo`: Chứa thông tin về ngôn ngữ và bảng mã (Translation).

#### Rich Header `parse_rich_header`

Bóc tách cấu trúc Rich Signature:
- Chứa chữ ký giải mã `DanS` / `Rich`
- Lưu thông tin về các phiên bản compiler, linker và build tools cụ thể tạo ra file nhị phân

## Quản lý Địa chỉ, Memory Mapping và Overlay Data

### Chuyển đổi Địa chỉ giữa RVA và File Offset

Chuyển đổi RVA <-> File Offset:
- `pe.get_offset_from_rva(rva)`: chuyển đổi từ RVA sang File Offset
- `pe.get_rva_from_offset(offset)`: chuyển đổi ngược laị từ File Offset sang RVA
- `pe.get_physical_by_rva(rva)`: lấy file offset trong file PE từ RVA

Xác định Section chứa địa chỉ
- `pe.get_section_by_rva(rva)`: tìm và trả về object Section bao bọc địa chỉ RVA đó
- `pe.get_section_by_offset(offset)`: tìm và trả về object Section bao bọc vị trí File Offset đó

### Đọc dữ liệu theo kiểu dữ liệu

1. Đọc Raw Bytes

`pe.get_data(rva=0, length=None)`: trích xuất mảng byte tại vị trí `rva` với độ dài `length`. Hàm đọc dữ liệu mà không phụ thuộc ranh giới các Sections

2. Đọc giá trị số nguyên với định dạng `Little-Endian`

| Kích thước | Đọc theo RVA | Đọc theo File Offset |
| --- | --- | --- |
| **2 bytes (WORD)** | `pe.get_word_at_rva(rva)` | `pe.get_word_from_offset(offset)` |
| **4 bytes (DWORD)** | `pe.get_dword_at_rva(rva)` | `pe.get_dword_from_offset(offset)` |
| **8 bytes (QWORD)** | `pe.get_qword_at_rva(rva)` | `pe.get_qword_from_offset(offset)` |

3. Đọc chuỗi ký tự

- `pe.get_string_at_rva(rva)`: đọc chuỗi ký tự `ASCII` bắt đầu từ RVA, tự động dừng lại khi gặp ký tự kết thúc `NULL` (`\x00`)
- `pe.get_string_u_at_rva(rva)`: Đọc chuỗi ký tự `Unicode` (UTF-16) bắt đầu từ RVA, tự động dừng lại khi gặp ký tự kết thúc `NULL`

### Memory Mapped Image & Relocations

Mô phỏng hành vi của Window Loader khi load file từ đĩa lên RAM và xử lý tái định vị địa chỉ cơ sở

Tái tạo ảnh bộ nhớ 
- **Cú pháp**: `pe.get_memory_mapped_image(max_virtual_address=268435456, ImageBase=None)`
- **Chức năng**: trả về khối byte biểu diễn cấu trúc của tệp PE khi đã được nạp hoàn chỉnh vào RAM 
- **Tham số `max_virtual_address`**: mặc định là `268435456` bytes (256 MB)
- **Tham số `ImageBase`**: địa chỉ cơ sở nạp file ảo

Áp dụng Relocation `pe.relocate_image`
- **Cú pháp**: `pe.relocate_image(new_ImageBase)`
- **Chức năng**: duyệt bảng Base Relocation Directory và áp dụng Direct Pointer Patching lên ảnh dữ liệu PE theo địa chỉ `new_ImageBase` mới chỉ định

### Xử lý Overlay Data 

`Overlay` là phần dữ liệu đính kèm nằm ngoài phạm vi định nghĩa của các PE Headers (thường xuất hiện ở cuối file sau section cuối cùng, hay dùng để giấu mã độc, chứa installer payload hoặc chữ ký số Authenticode)

- `pe.get_overlay()`: Bóc tách và trả về toàn bộ mảng byte của phần dữ liệu overlay.
- `pe.get_overlay_data_start_offset()`: Trả về vị trí File Offset chính xác nơi bắt đầu xuất hiện dữ liệu overlay trong file.
- `pe.trim()`: Cắt bỏ hoàn toàn phần overlay thừa ở cuối tệp, chỉ giữ lại đúng khối lượng dữ liệu chuẩn được định nghĩa bởi cấu trúc PE Headers.

## Phân tích Chữ ký PEiD &amp; Malware Analysis với `peutils`

### Nạp cơ sở dữ liệu chữ ký `SignatureDatabase`

```python
import peutils

# 1. Nạp từ tệp văn bản trên ổ đĩa
signatures = peutils.SignatureDatabase('/path/to/signature.txt')

# 2. Tải và nạp trực tiếp từ URL
signatures = peutils.SignatureDatabase('http://url.to/signature.txt')

# 3. Nạp bổ sung thêm các chữ ký khác vào database hiện có
signatures.load('/path/to/extra-signatures.txt')
```

### Signature Matching

So khớp cấu trúc nhị phân của file với database chữ ký đã nạp:
`signatures.match(pe, ep_only=True, section_start_only=False)`: Duyệt tìm và trả về duy nhất một chữ ký khớp chính xác nhất.

`signatures.match_all(pe, ep_only=True, section_start_only=False)`: Duyệt toàn bộ cây tìm kiếm và trả về danh sách tất cả các chữ ký trùng khớp.
- `ep_only=True`: Chỉ quét tại vị trí Entry Point.
- `section_start_only=False`: Không giới hạn việc chỉ kiểm tra ở điểm bắt đầu mỗi section

### Signature Generation

Tạo chuỗi nhận dạng cho các file nhị phân mới:

`generate_ep_signature(pe, name, sig_length=512)`: Trích xuất chuỗi byte tại Entry Point với độ dài chỉ định (sig_length, mặc định là 512 bytes) để tạo chữ ký mang tên `name`.

`generate_section_signatures(pe, name, sig_length=512)`: Quét và tự động sinh chữ ký cho toàn bộ các section chứa dữ liệu hợp lệ trong file.

### Hàm Phân tích Heuristic & Nhận diện Packer

`peutils.is_probably_packed(pe)`: Trả về True nếu dữ liệu có dấu hiệu nén/mã hóa trong các section chiếm trên 20% tổng dung lượng file (dựa trên mức độ hỗn loạn/entropy dữ liệu).

`peutils.is_suspicious(pe)`: Trả về True khi phát hiện các đặc điểm bất thường điển hình của mã độc:

- Bảng Import Table nằm ở vị trí kỳ lạ (ngoài các section thông thường).

- Tên section không hợp lệ hoặc chứa ký tự đặc biệt.

- Xuất hiện các chuỗi ký tự ASCII dài bất thường ở những vị trí không quy chuẩn.

## Modifying & Writing PE Files

### Thay đổi Giá trị Header & Dữ liệu

#### Gán thuộc tính trực tiếp trên Header

```python
pe.OPTIONAL_HEADER.AddressOfEntryPoint = 0xDEADBEEF
```

#### Ghi đè Raw Bytes

`pe.set_bytes_at_rva(rva, data)`: Ghi đè chuỗi byte data vào vị trí tương ứng với địa chỉ ảo RVA.

`pe.set_bytes_at_offset(offset, data)`: Ghi đè chuỗi byte data trực tiếp vào vị trí File Offset vật lý.

#### Ghi giá trị số nguyên theo kích thước

| Thao tác ghi | Theo địa chỉ RVA | Theo File Offset |
| --- | --- | --- |
| **Ghi 2 bytes (WORD)** | `pe.set_word_at_rva(rva, val)` | `pe.set_word_at_offset(offset, val)` |
| **Ghi 4 bytes (DWORD)** | `pe.set_dword_at_rva(rva, val)` | `pe.set_dword_at_offset(offset, val)` |
| **Ghi 8 bytes (QWORD)** | `pe.set_qword_at_rva(rva, val)` | `pe.set_qword_at_offset(offset, val)` |

#### Đồng bộ dữ liệu Section

`pe.merge_modified_section_data()`: Cập nhật và đồng bộ lại toàn bộ dữ liệu của PE image sau khi đã can thiệp/chỉnh sửa nội dung của từng section riêng lẻ.

### Xuất file ra disk

Lưu ra file mới `pe.write(filename='modified_file.exe')`

**Xuất ra dữ liệu nhị phân**: Nếu bỏ trống tham số filename (tức pe.write()), hàm sẽ trả về toàn bộ cấu trúc file PE đã sửa dưới dạng mảng byte (bytearray / bytes).

### Rules of Thumb

**In-place Overwrite**: pefile ghi đè chuẩn xác các giá trị header hoặc byte dữ liệu sẵn có trong cấu trúc file hiện hữu.

**Không dịch chuyển cấu trúc**: Thư viện không tự động dời các section phía sau để mở rộng khoảng trống khi thêm section mới hoặc chèn cấu trúc vượt quá vùng trống liền kề.

**Ứng dụng thực tế**: Lý tưởng để vá header bị cố tình làm biến dạng (malformed headers), giúp các công cụ dịch ngược như IDA Pro hay Ghidra khôi phục khả năng phân tích bình thường.

