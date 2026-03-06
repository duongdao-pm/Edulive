# TỔNG QUAN TASK

## **Tuần 1 – Xong spec, data, script, chạy benchmark lượt 1**

### Ngày 1–2 (03–04/03) – Spec \+ data \+ chuẩn bị model

* Hoàn thiện PROJECT\_SPEC.md:  
- Mô tả 3 task từ check\_grammar.txt \+ JSON schema chi tiết.​  
- Constraint server: model runtime ≤12GB VRAM, concurrency target (4 request), context tối thiểu 2k–4k.  
* Tạo eval\_dataset:  
- 6 dạng × 20 câu \= 120 input, format đúng với từng task\_type.  
* ollama pull 3–4 model:  
- 6B nhẹ: gpt-oss-nano:6b, gpt-oss-6.0b.  
- 20B quant: 1–2 bản Q3/Q4 (vd gpt-oss:20b\_Q4\_K\_M).  
* Smoke test: mỗi model 1–2 request, đảm bảo không OOM ở num\_ctx 2048\.

### Ngày 3–4 (05–06/03) – Script benchmark & chạy thử

* Viết script benchmark:  
- Đọc dataset 120 câu, gửi request theo batch 4 request/lần.  
- Log: latency, tokens/s (ước), model, config, task\_type.  
* Chạy thử full 120 câu trên 1 model nhẹ (nano 6B):  
- Kiểm tra tất cả JSON parse được, không lẫn thinking.  
- Fix prompt nếu cần để output khớp schema.​  
* Bắt đầu benchmark lượt 1:  
- Chạy full 120 câu cho 1–2 model (mỗi model 1 config cơ bản, ví dụ num\_ctx 4096).

### Ngày 5 (07/03) – Phân tích nhanh & refine

* Đọc nhanh kết quả lượt 1:  
- So sánh tốc độ, VRAM peak, tỉ lệ JSON hợp lệ.  
- So sánh cảm quan chất lượng trên \~10 output/model/dạng.  
* Từ đó:  
- Chỉnh prompt (nếu còn lỗi format).  
- Quyết định thêm 1–2 config cần test trong tuần 2 (ví dụ num\_ctx 2048/3072 cho 20B).

---

## **Tuần 2 – Benchmark lượt 2 (đủ config) \+ phân tích sâu \+ chốt model**

### Ngày 6–8 (10–12/03) – Benchmark đầy đủ cho tất cả model

* Chạy benchmark full 120 câu cho:  
- 2 model 6B (mỗi model 1–2 config).  
- 1–2 model 20B quant (mỗi model 2–3 config, ví dụ num\_ctx 2048/4096).  
* Trong khi job chạy (mỗi job \~1h/model/config), tận dụng thời gian:  
- Viết script phân tích kết quả (group theo model/config/task\_type).  
- Ghi chú những case model chấm “ngớ ngẩn” để sau này có ví dụ minh họa.

### Ngày 9–10 (13–14/03) – Phân tích chi tiết

* Về performance:  
- Cho mỗi model+config:  
- Peak VRAM, latency trung bình/bậc phân vị (P50/P95), tokens/s.  
* Về format:  
- Tỉ lệ JSON parse thành công, tỉ lệ lỗi format theo task.  
* Về chất lượng ngữ nghĩa:  
- Với mỗi dạng bài, lấy ngẫu nhiên 5–10 mẫu/model:  
- Đánh tay (hoặc dùng 1 model cloud làm referee) để xem:  
- Phát hiện lỗi ngữ pháp từ file test tốt không.  
- Feedback có hợp lý & dễ hiểu với học sinh không.

Kết quả: 1 bảng so sánh rõ ràng per model, per dạng bài (6 dạng).

### Ngày 11–12 (17–18/03) – Chốt model & viết tài liệu

* Họp nội bộ :  
- Chọn 1 primary model:  
- Đạt VRAM ≤12GB, tốc độ chấp nhận được.  
- Chất lượng chấm điểm ổn nhất trên 6 dạng.  
- Chọn 1 backup model (nhẹ hơn, để fallback).  
* Viết:  
  * MODEL\_CONFIG.md:  
- Tên model, quant, tham số num\_ctx, concurrency tối đa, ghi chú VRAM đo được.  
  * EVAL\_REPORT.md:  
- Tóm tắt quy trình eval.  
- Bảng so sánh các model chính.  
- Ví dụ vài case điển hình (model tốt / model fail) cho từng dạng bài.

# KẾ HOẠCH CHỌN MODEL CHẤM NGỮ PHÁP TIẾNG ANH

# **KẾ HOẠCH CHỌN MODEL CHẤM NGỮ PHÁP TIẾNG ANH**

Thời gian: 2 tuần (03/03 \- 18/03/2026)  
Nhân sự: 3 người  
A – Thịnh: Ollama/llama.cpp, script benchmark, log tổng hợp  
B – Tuyến: Đánh giá chất lượng model, chạy benchmark  
C – Nam: Chuẩn bị dataset, thiết kế prompt

---

## **TỔNG QUAN TIMELINE**

| Ngày | Hoạt động chính | Trạng thái dự kiến |
| :---- | :---- | :---- |
| 03-04/03 | Spec \+ Dataset \+ Pull model | ✅ PROJECT\_SPEC.md \+ eval\_dataset.jsonl |
| 05-06/03 | Script benchmark \+ test vòng 1 | ✅ Script chạy ổn định |
| 07/03 | Tổng hợp tuần 1 | ✅ 1 model benchmark full 120 câu |
| 10-12/03 | Benchmark full 5 model | ✅ Raw data tất cả model |
| 13-14/03 | Phân tích \+ đánh giá chất lượng | ✅ Bảng so sánh model |
| 17-18/03 | Chốt model \+ báo cáo | ✅ MODEL\_CONFIG.md \+ EVAL\_REPORT.md |

---

## **PHÂN CHIA CÔNG VIỆC CHI TIẾT**

## **TUẦN 1: Chuẩn bị & benchmark sơ bộ**

## **Ngày 1-2 (03-04/03)**

A – Thịnh (Infra & Script)

`├── Ghi cấu hình server: GPU/VRAM/RAM/CPU`  

`├── Constraint: model ≤12GB VRAM, concurrency=4, ctx 2k-4k`  

`├── ollama pull 5 models:`

`│   ├── DedeProGames/gpt-oss-nano:6b (4.6GB)`

`│   ├── mcgdj/gpt-oss-6.0b`  

`│   ├── SimonPu/gpt-oss:20b_Q4_K_M`  

`│   ├── TheBloke/Karen_TheEditor_V2_STRICT_Mistral_7B-GGUF`  

`│   └── Mzbac_Llama3_8B_Grammar (tìm GGUF)`  

`└── Smoke test: 1 request/model với num_ctx=2048`

B – Tuyến (Benchmark & Quality)

`├── Hỗ trợ Thịnh test smoke test`  

`├── Chuẩn bị template đánh giá chất lượng:`

`│   ├── Grammar detection accuracy (1-5)`

`│   ├── Feedback quality (1-5)`  

`│   ├── JSON format correctness`

`└── Review output từ smoke test → ghi note ban đầu`

C – Nam (Data & Prompt)

text

`├── Đọc check_grammar.txt → extract 3 task types + JSON schema`  

`├── Tạo eval_dataset.jsonl (6 dạng × 20 câu = 120 input):`

`│   ├── translation_score (20 câu)`

`│   ├── write_sentence_with_a_topic (20 câu)`  

`│   ├── write_sentence_with_specific_grammar (20 câu)`

`│   └── 3 dạng khác từ spec (60 câu)`

`└── Viết PROJECT_SPEC.md phần task description + schema`

## **Ngày 3-4 (05-06/03)**

A – Thịnh

`├── Viết benchmark.py hoàn chỉnh:`

`│   ├── Đọc eval_dataset.jsonl`  

`│   ├── Concurrency=4 requests (120s/batch)`  

`│   ├── Log đầy đủ: latency, VRAM peak (nvidia-smi), JSON raw`  

`│   ├── CSV export tự động`

`│   └── Dashboard live (tùy chọn: tqdm progress bar)`

`└── Test benchmark 1 dạng (20 câu) → nano 6B`

B – Tuyến

text

`├── Test manual quality check 10 output từ benchmark test`  

`├── Ghi nhận lỗi format/quality → feedback cho Nam`  

`└── Hỗ trợ debug nếu benchmark script có vấn đề`

C – Nam

text

`├── Thiết kế 3 prompt template theo task_type:`

`│   ├── translation_score prompt`  

`│   ├── write_sentence_with_a_topic prompt`

`│   └── write_sentence_with_specific_grammar prompt`

`├── Test prompt với nano 6B → refine đến JSON clean 100%`

`└── Fix dataset nếu phát hiện format error từ benchmark test`

## **Ngày 5 (07/03) – Review tuần 1**

A – Thịnh

text

`├── Chạy benchmark FULL 120 câu → nano 6B (num_ctx=4096)`

`├── Tạo log tổng hợp tuần 1`

`└── Backup raw data`

B – Tuyến

text

`├── Quality check 20 output từ nano 6B full run`

`├── Score grammar detection + feedback quality`

`└── Note strengths/weaknesses`

C – Nam

`├── Parse kết quả benchmark → CSV analysis`

`├── Tạo dashboard sơ bộ: latency/VRAM/JSON success rate`

`└── Đề xuất config test tuần 2 (num_ctx values)`

---

## **TUẦN 2: Benchmark full \+ phân tích**

## **Ngày 6-8 (10-12/03)**

A – Thịnh (Benchmark Infrastructure)

`CHẠY LIÊN TỤC 3 NGÀY - QUEUE JOB:`

`Day 6:` 

`├── nano 6B: num_ctx 2048/4096`  

`├── gpt-oss-6.0b: num_ctx 2048/4096`

`Day 7:`

`├── gpt-oss-20b Q4: num_ctx 2048/3072`  

`└── Karen Mistral 7B: num_ctx 3072/4096`

`Day 8:`  

`├── Llama3 8B Grammar: num_ctx 2048/3072`

`└── Rerun failed jobs + edge cases`

B – Tuyến (Live Quality Assessment)

`PARALLEL VỚI BENCHMARK:`

`├── Mỗi ngày check 50 output mới (10/model/task×5 models)`

`├── Live scoring: grammar accuracy, feedback quality`  

`├── Flag critical failures (false negatives/positives)`

`└── Daily report: "Model X weak ở task Y"`

C – Nam (Live Analysis)

`LIVE DASHBOARD UPDATE:`

`├── Per model: VRAM peak, P50/P95 latency, JSON success`  

`├── Per task: success rate by task_type`  

`├── Per config: concurrency stability (4 requests)`  

`└── Early ranking signals`

## **Ngày 9-10 (13-14/03) – Deep Analysis**

A – Thịnh

`├── Tổng hợp tất cả benchmark data → master CSV`  

`├── Visualize: VRAM vs latency scatter plot`  

`└── Filter candidates: VRAM≤12GB + latency<30s avg`

B – Tuyến

`├── Deep dive per task_type (20 samples/task/model×6 tasks)`

`├── Detailed quality scoring matrix`  

`└── Ví dụ minh họa: best/worst cases per model`

C – Nam

`├── Statistical analysis:`

`│   ├── Model ranking (weighted: perf 40% + quality 60%)`

`│   ├── Confidence intervals cho scores`  

`│   └── Per-task recommendations`

`└── Draft comparison table`

## **Ngày 11-12 (17-18/03) – Final Decision & Documentation**

A – Thịnh

`├── FINAL MODEL SELECTION MEETING`

`├── Viết MODEL_CONFIG.md:`

`│   ├── PRIMARY model + exact config (num_ctx, concurrency)`

`│   ├── BACKUP model`  

`│   └── Deployment notes (VRAM measured, latency SLA)`

`└── Package benchmark_results/ folder`

B – Tuyến

`├── Viết EVAL_REPORT.md phần Quality Analysis:`

`│   ├── Executive summary per model`  

`│   ├── Task-wise performance`  

`│   └── Recommendation rationale`

`└── Sample outputs gallery (good/bad cases)`

C – Nam

`├── Hoàn thiện EVAL_REPORT.md:`

`│   ├── Full comparison tables + charts ` 

`│   ├── Methodology documentation`  

`│   └── Raw data appendix links`

`└── Project handover doc cho phase tiếp theo`

---

## **DELIVERABLES CUỐI DỰ ÁN (18/03)**

`📁 project_model_selection/`

`├── 📄 PROJECT_SPEC.md (Nam)`

`├── 📁 data/`

`│   └── eval_dataset.jsonl (120 inputs - Nam)`  

`├── 📁 benchmark_results/ (Thịnh)`

`│   ├── raw_logs/ (per model/config)`

`│   └── analysis/ (CSVs, charts)`

`├── 📄 MODEL_CONFIG.md (Thịnh - PRIMARY+BACKUP)`

`├── 📄 EVAL_REPORT.md (Tuyến+Nam - 10 pages)`

`└── 📋 README.md (deployment guide)`

## **SUCCESS METRICS**

`✅ 5 models × 2 configs = 10 full benchmarks (120 câu each)`

`✅ JSON valid rate ≥95% all tasks`  

`✅ PRIMARY model: VRAM≤12GB, latency<30s (4 concurrent)`  

`✅ Quality score ≥7.5/10 (Tuyến đánh giá)`  

`✅ All deliverables complete by 18/03`

Primary Contact: Thịnh (A) \- Infra lead & final decision  
Deadline: 18/03/2026 (Thứ 4 tuần sau)

