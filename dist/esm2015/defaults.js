import { SECONDARY_PLACEHOLDER, PLACEHOLDER } from './core/constants/index';
export const defaults = {
    tagInput: {
        separatorKeys: [],
        separatorKeyCodes: [],
        maxItems: Infinity,
        placeholder: PLACEHOLDER,
        secondaryPlaceholder: SECONDARY_PLACEHOLDER,
        validators: [],
        asyncValidators: [],
        onlyFromAutocomplete: false,
        errorMessages: {},
        theme: '',
        onTextChangeDebounce: 250,
        inputId: null,
        inputClass: '',
        clearOnBlur: false,
        hideForm: false,
        addOnBlur: false,
        addOnPaste: false,
        pasteSplitPattern: ',',
        blinkIfDupe: true,
        removable: true,
        editable: false,
        allowDupes: false,
        modelAsStrings: false,
        trimTags: true,
        ripple: true,
        tabIndex: '',
        disable: false,
        dragZone: '',
        onRemoving: undefined,
        onAdding: undefined,
        displayBy: 'display',
        identifyBy: 'value',
        animationDuration: {
            enter: '250ms',
            leave: '150ms'
        }
    },
    dropdown: {
        displayBy: 'display',
        identifyBy: 'value',
        appendToBody: true,
        offset: '50 0',
        focusFirstElement: false,
        showDropdownIfEmpty: false,
        minimumTextLength: 1,
        limitItemsTo: Infinity,
        keepOpen: true,
        dynamicUpdate: true,
        zIndex: 1000,
        matchingFn
    }
};
/**
 * @name matchingFn
 * @param this
 * @param value
 * @param target
 */
function matchingFn(value, target) {
    const targetValue = target[this.displayBy].toString();
    return targetValue && targetValue
        .toLowerCase()
        .indexOf(value.toLowerCase()) >= 0;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVmYXVsdHMuanMiLCJzb3VyY2VSb290IjoiQzovVXNlcnMvSnVhbiBSIERlIExlb24vRG9jdW1lbnRzL1Byb3llY3Rvcy9uZ3gtY2hpcHMvbW9kdWxlcy8iLCJzb3VyY2VzIjpbImRlZmF1bHRzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUdBLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxXQUFXLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQTBENUUsTUFBTSxDQUFDLE1BQU0sUUFBUSxHQUFHO0lBQ3BCLFFBQVEsRUFBbUI7UUFDdkIsYUFBYSxFQUFFLEVBQUU7UUFDakIsaUJBQWlCLEVBQUUsRUFBRTtRQUNyQixRQUFRLEVBQUUsUUFBUTtRQUNsQixXQUFXLEVBQUUsV0FBVztRQUN4QixvQkFBb0IsRUFBRSxxQkFBcUI7UUFDM0MsVUFBVSxFQUFFLEVBQUU7UUFDZCxlQUFlLEVBQUUsRUFBRTtRQUNuQixvQkFBb0IsRUFBRSxLQUFLO1FBQzNCLGFBQWEsRUFBRSxFQUFFO1FBQ2pCLEtBQUssRUFBRSxFQUFFO1FBQ1Qsb0JBQW9CLEVBQUUsR0FBRztRQUN6QixPQUFPLEVBQUUsSUFBSTtRQUNiLFVBQVUsRUFBRSxFQUFFO1FBQ2QsV0FBVyxFQUFFLEtBQUs7UUFDbEIsUUFBUSxFQUFFLEtBQUs7UUFDZixTQUFTLEVBQUUsS0FBSztRQUNoQixVQUFVLEVBQUUsS0FBSztRQUNqQixpQkFBaUIsRUFBRSxHQUFHO1FBQ3RCLFdBQVcsRUFBRSxJQUFJO1FBQ2pCLFNBQVMsRUFBRSxJQUFJO1FBQ2YsUUFBUSxFQUFFLEtBQUs7UUFDZixVQUFVLEVBQUUsS0FBSztRQUNqQixjQUFjLEVBQUUsS0FBSztRQUNyQixRQUFRLEVBQUUsSUFBSTtRQUNkLE1BQU0sRUFBRSxJQUFJO1FBQ1osUUFBUSxFQUFFLEVBQUU7UUFDWixPQUFPLEVBQUUsS0FBSztRQUNkLFFBQVEsRUFBRSxFQUFFO1FBQ1osVUFBVSxFQUFFLFNBQVM7UUFDckIsUUFBUSxFQUFFLFNBQVM7UUFDbkIsU0FBUyxFQUFFLFNBQVM7UUFDcEIsVUFBVSxFQUFFLE9BQU87UUFDbkIsaUJBQWlCLEVBQUU7WUFDZixLQUFLLEVBQUUsT0FBTztZQUNkLEtBQUssRUFBRSxPQUFPO1NBQ2pCO0tBQ0o7SUFDRCxRQUFRLEVBQTJCO1FBQy9CLFNBQVMsRUFBRSxTQUFTO1FBQ3BCLFVBQVUsRUFBRSxPQUFPO1FBQ25CLFlBQVksRUFBRSxJQUFJO1FBQ2xCLE1BQU0sRUFBRSxNQUFNO1FBQ2QsaUJBQWlCLEVBQUUsS0FBSztRQUN4QixtQkFBbUIsRUFBRSxLQUFLO1FBQzFCLGlCQUFpQixFQUFFLENBQUM7UUFDcEIsWUFBWSxFQUFFLFFBQVE7UUFDdEIsUUFBUSxFQUFFLElBQUk7UUFDZCxhQUFhLEVBQUUsSUFBSTtRQUNuQixNQUFNLEVBQUUsSUFBSTtRQUNaLFVBQVU7S0FDYjtDQUNKLENBQUM7QUFFRjs7Ozs7R0FLRztBQUNILFNBQVMsVUFBVSxDQUF5QixLQUFhLEVBQUUsTUFBZ0I7SUFDdkUsTUFBTSxXQUFXLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUV0RCxPQUFPLFdBQVcsSUFBSSxXQUFXO1NBQzVCLFdBQVcsRUFBRTtTQUNiLE9BQU8sQ0FBQyxLQUFLLENBQUMsV0FBVyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDM0MsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgVmFsaWRhdG9yRm4sIEFzeW5jVmFsaWRhdG9yRm4gfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcblxyXG5pbXBvcnQgeyBTRUNPTkRBUllfUExBQ0VIT0xERVIsIFBMQUNFSE9MREVSIH0gZnJvbSAnLi9jb3JlL2NvbnN0YW50cy9pbmRleCc7XHJcbmltcG9ydCB7IFRhZ0lucHV0RHJvcGRvd24gfSBmcm9tICcuL2NvbXBvbmVudHMvZHJvcGRvd24vdGFnLWlucHV0LWRyb3Bkb3duLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IFRhZ01vZGVsIH0gZnJvbSAnLi9jb3JlL2FjY2Vzc29yJztcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgVGFnSW5wdXRPcHRpb25zIHtcclxuICAgIHNlcGFyYXRvcktleXM6IHN0cmluZ1tdO1xyXG4gICAgc2VwYXJhdG9yS2V5Q29kZXM6IG51bWJlcltdO1xyXG4gICAgbWF4SXRlbXM6IG51bWJlcjtcclxuICAgIHBsYWNlaG9sZGVyOiBzdHJpbmc7XHJcbiAgICBzZWNvbmRhcnlQbGFjZWhvbGRlcjogc3RyaW5nO1xyXG4gICAgdmFsaWRhdG9yczogVmFsaWRhdG9yRm5bXTtcclxuICAgIGFzeW5jVmFsaWRhdG9yczogQXN5bmNWYWxpZGF0b3JGbltdO1xyXG4gICAgb25seUZyb21BdXRvY29tcGxldGU6IGJvb2xlYW47XHJcbiAgICBlcnJvck1lc3NhZ2VzOiB7IFtrZXk6IHN0cmluZ106IHN0cmluZzsgfTtcclxuICAgIHRoZW1lOiAnJztcclxuICAgIG9uVGV4dENoYW5nZURlYm91bmNlOiBudW1iZXI7XHJcbiAgICBpbnB1dElkOiBzdHJpbmcgfCBudWxsO1xyXG4gICAgaW5wdXRDbGFzczogc3RyaW5nO1xyXG4gICAgY2xlYXJPbkJsdXI6IGJvb2xlYW47XHJcbiAgICBoaWRlRm9ybTogYm9vbGVhbjtcclxuICAgIGFkZE9uQmx1cjogYm9vbGVhbjtcclxuICAgIGFkZE9uUGFzdGU6IGJvb2xlYW47XHJcbiAgICBwYXN0ZVNwbGl0UGF0dGVybjogc3RyaW5nIHwgUmVnRXhwO1xyXG4gICAgYmxpbmtJZkR1cGU6IGJvb2xlYW47XHJcbiAgICByZW1vdmFibGU6IGJvb2xlYW47XHJcbiAgICBlZGl0YWJsZTogYm9vbGVhbjtcclxuICAgIGFsbG93RHVwZXM6IGJvb2xlYW47XHJcbiAgICBtb2RlbEFzU3RyaW5nczogYm9vbGVhbjtcclxuICAgIHRyaW1UYWdzOiBib29sZWFuO1xyXG4gICAgcmlwcGxlOiBib29sZWFuO1xyXG4gICAgdGFiSW5kZXg6IHN0cmluZztcclxuICAgIGRpc2FibGU6IGJvb2xlYW47XHJcbiAgICBkcmFnWm9uZTogc3RyaW5nO1xyXG4gICAgb25SZW1vdmluZz86ICh0YWc6IFRhZ01vZGVsKSA9PiBPYnNlcnZhYmxlPFRhZ01vZGVsPjtcclxuICAgIG9uQWRkaW5nPzogKHRhZzogVGFnTW9kZWwpID0+IE9ic2VydmFibGU8VGFnTW9kZWw+O1xyXG4gICAgZGlzcGxheUJ5OiBzdHJpbmc7XHJcbiAgICBpZGVudGlmeUJ5OiBzdHJpbmc7XHJcbiAgICBhbmltYXRpb25EdXJhdGlvbjoge1xyXG4gICAgICAgIGVudGVyOiBzdHJpbmcsXHJcbiAgICAgICAgbGVhdmU6IHN0cmluZ1xyXG4gICAgfTtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBUYWdJbnB1dERyb3Bkb3duT3B0aW9ucyB7XHJcbiAgICBkaXNwbGF5Qnk6IHN0cmluZztcclxuICAgIGlkZW50aWZ5Qnk6IHN0cmluZztcclxuICAgIGFwcGVuZFRvQm9keTogYm9vbGVhbjtcclxuICAgIG9mZnNldDogc3RyaW5nO1xyXG4gICAgZm9jdXNGaXJzdEVsZW1lbnQ6IGJvb2xlYW47XHJcbiAgICBzaG93RHJvcGRvd25JZkVtcHR5OiBib29sZWFuO1xyXG4gICAgbWluaW11bVRleHRMZW5ndGg6IG51bWJlcjtcclxuICAgIGxpbWl0SXRlbXNUbzogbnVtYmVyO1xyXG4gICAga2VlcE9wZW46IGJvb2xlYW47XHJcbiAgICB6SW5kZXg6IG51bWJlcjtcclxuICAgIGR5bmFtaWNVcGRhdGU6IGJvb2xlYW47XHJcbiAgICBtYXRjaGluZ0ZuOiAodmFsdWU6IHN0cmluZywgdGFyZ2V0OiBUYWdNb2RlbCkgPT4gYm9vbGVhbjtcclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IGRlZmF1bHRzID0ge1xyXG4gICAgdGFnSW5wdXQ6IDxUYWdJbnB1dE9wdGlvbnM+e1xyXG4gICAgICAgIHNlcGFyYXRvcktleXM6IFtdLFxyXG4gICAgICAgIHNlcGFyYXRvcktleUNvZGVzOiBbXSxcclxuICAgICAgICBtYXhJdGVtczogSW5maW5pdHksXHJcbiAgICAgICAgcGxhY2Vob2xkZXI6IFBMQUNFSE9MREVSLFxyXG4gICAgICAgIHNlY29uZGFyeVBsYWNlaG9sZGVyOiBTRUNPTkRBUllfUExBQ0VIT0xERVIsXHJcbiAgICAgICAgdmFsaWRhdG9yczogW10sXHJcbiAgICAgICAgYXN5bmNWYWxpZGF0b3JzOiBbXSxcclxuICAgICAgICBvbmx5RnJvbUF1dG9jb21wbGV0ZTogZmFsc2UsXHJcbiAgICAgICAgZXJyb3JNZXNzYWdlczoge30sXHJcbiAgICAgICAgdGhlbWU6ICcnLFxyXG4gICAgICAgIG9uVGV4dENoYW5nZURlYm91bmNlOiAyNTAsXHJcbiAgICAgICAgaW5wdXRJZDogbnVsbCxcclxuICAgICAgICBpbnB1dENsYXNzOiAnJyxcclxuICAgICAgICBjbGVhck9uQmx1cjogZmFsc2UsXHJcbiAgICAgICAgaGlkZUZvcm06IGZhbHNlLFxyXG4gICAgICAgIGFkZE9uQmx1cjogZmFsc2UsXHJcbiAgICAgICAgYWRkT25QYXN0ZTogZmFsc2UsXHJcbiAgICAgICAgcGFzdGVTcGxpdFBhdHRlcm46ICcsJyxcclxuICAgICAgICBibGlua0lmRHVwZTogdHJ1ZSxcclxuICAgICAgICByZW1vdmFibGU6IHRydWUsXHJcbiAgICAgICAgZWRpdGFibGU6IGZhbHNlLFxyXG4gICAgICAgIGFsbG93RHVwZXM6IGZhbHNlLFxyXG4gICAgICAgIG1vZGVsQXNTdHJpbmdzOiBmYWxzZSxcclxuICAgICAgICB0cmltVGFnczogdHJ1ZSxcclxuICAgICAgICByaXBwbGU6IHRydWUsXHJcbiAgICAgICAgdGFiSW5kZXg6ICcnLFxyXG4gICAgICAgIGRpc2FibGU6IGZhbHNlLFxyXG4gICAgICAgIGRyYWdab25lOiAnJyxcclxuICAgICAgICBvblJlbW92aW5nOiB1bmRlZmluZWQsXHJcbiAgICAgICAgb25BZGRpbmc6IHVuZGVmaW5lZCxcclxuICAgICAgICBkaXNwbGF5Qnk6ICdkaXNwbGF5JyxcclxuICAgICAgICBpZGVudGlmeUJ5OiAndmFsdWUnLFxyXG4gICAgICAgIGFuaW1hdGlvbkR1cmF0aW9uOiB7XHJcbiAgICAgICAgICAgIGVudGVyOiAnMjUwbXMnLFxyXG4gICAgICAgICAgICBsZWF2ZTogJzE1MG1zJ1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBkcm9wZG93bjogPFRhZ0lucHV0RHJvcGRvd25PcHRpb25zPntcclxuICAgICAgICBkaXNwbGF5Qnk6ICdkaXNwbGF5JyxcclxuICAgICAgICBpZGVudGlmeUJ5OiAndmFsdWUnLFxyXG4gICAgICAgIGFwcGVuZFRvQm9keTogdHJ1ZSxcclxuICAgICAgICBvZmZzZXQ6ICc1MCAwJyxcclxuICAgICAgICBmb2N1c0ZpcnN0RWxlbWVudDogZmFsc2UsXHJcbiAgICAgICAgc2hvd0Ryb3Bkb3duSWZFbXB0eTogZmFsc2UsXHJcbiAgICAgICAgbWluaW11bVRleHRMZW5ndGg6IDEsXHJcbiAgICAgICAgbGltaXRJdGVtc1RvOiBJbmZpbml0eSxcclxuICAgICAgICBrZWVwT3BlbjogdHJ1ZSxcclxuICAgICAgICBkeW5hbWljVXBkYXRlOiB0cnVlLFxyXG4gICAgICAgIHpJbmRleDogMTAwMCxcclxuICAgICAgICBtYXRjaGluZ0ZuXHJcbiAgICB9XHJcbn07XHJcblxyXG4vKipcclxuICogQG5hbWUgbWF0Y2hpbmdGblxyXG4gKiBAcGFyYW0gdGhpc1xyXG4gKiBAcGFyYW0gdmFsdWVcclxuICogQHBhcmFtIHRhcmdldFxyXG4gKi9cclxuZnVuY3Rpb24gbWF0Y2hpbmdGbih0aGlzOiBUYWdJbnB1dERyb3Bkb3duLCB2YWx1ZTogc3RyaW5nLCB0YXJnZXQ6IFRhZ01vZGVsKTogYm9vbGVhbiB7XHJcbiAgICBjb25zdCB0YXJnZXRWYWx1ZSA9IHRhcmdldFt0aGlzLmRpc3BsYXlCeV0udG9TdHJpbmcoKTtcclxuXHJcbiAgICByZXR1cm4gdGFyZ2V0VmFsdWUgJiYgdGFyZ2V0VmFsdWVcclxuICAgICAgICAudG9Mb3dlckNhc2UoKVxyXG4gICAgICAgIC5pbmRleE9mKHZhbHVlLnRvTG93ZXJDYXNlKCkpID49IDA7XHJcbn1cclxuIl19